const express = require("express");
const app = express();
const cors = require("cors");
const pool1 = require("./db");
const PoolUser = require("pg").Pool;
//middleware
app.use(cors());
app.use(express.json()); //req body

//TODO: posloveni spremenljivke in tekst..

//TODO: v bazi uredi dovoljenja uporabnikov

//TODO: povsod dodaj, da dostopa tisti uporabnik, ki je prijavljen
			//--->torej namesto pool1 dostopa pool... 
			    //---->poglej kako narest to, da ni treba v vsakem requestu tega posebej dobivat

//vsi podatki o vseh zaposlenih
app.get("/users",async(req,res) => {
    try {
        const vseDatoteke= await pool1.query("SELECT * from zaposleni");
        res.json(vseDatoteke.rows);
    } catch (error) {
        console.error(error.message);
    }
})

//TODO: razisci kako najbolje narediti avtorizacijo..
//password check
// app.get("/users/:password",async(req,res) => {
//     try {
        
//     } catch (error) {
//         console.error(error.message);
//     }
// });

//vsi podatki o enem zaposlenem
app.get("/users/:username",async(req,res) => {
    
    try {
        // const {password} = req.query;
        const {username} = req.params;
        const pool = new PoolUser({
            user:username,
            password:username,
            host:"192.168.38.164",
            port:5432,
            database:"irgodb"
        })
        const izbraneDatoteke= await pool1.query("SELECT * from zaposleni where $1=username",[username]);

        res.json(izbraneDatoteke.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

//dodajanje novega zaposlenega
app.post("/users", async (req, res) => {
    //await
    try {
      const newFile = await pool1.query(
        "insert into zaposleni(ime,priimek,email,username,password,oddelek_id) values ('peter','Novak','@si','asdsad',2) returning *"
      );
      res.json(newFile.rows[0]);
    } catch (error) {
      console.error(error.message);
    }
  });
  
  //spreminjanje česarkoli o zaposlenem razen gesla
  app.put("/users/:id",async(req,res) =>{
      try {
        const {id} = req.params;
        let props: { prop: string, value:any }[] = [];
        
        const body= req.body;
        if(body.hasOwnProperty('ime')){
            props.push({prop:'ime',value:body.ime});
        }
        if(body.hasOwnProperty('priimek')){
            
            props.push({prop:'priimek',value:body.priimek});
        }
        if(body.hasOwnProperty('email')){
            props.push({prop:'email',value:body.email});
        }
        if(body.hasOwnProperty('username')){
            props.push({prop:'username',value:body.username});
        }
        if(body.hasOwnProperty('oddelek_id')){
            props.push({prop:'oddelek_id',value:body.oddelek_id});
        }
        
        let updateQuery:string ="UPDATE zaposleni set ";
        for(let i= 0;  i <props.length;i++){
            if(i < props.length-1){
                if(props[i].prop === "oddelek_id"){

                    updateQuery=updateQuery.concat(`${props[i].prop}=${props[i].value}, `);
                }
                else{
                    updateQuery=updateQuery.concat(`${props[i].prop}='${props[i].value}', `);
                }
            }
            else{
                if(props[i].prop === "oddelek_id"){

                    updateQuery=updateQuery.concat(`${props[i].prop}=${props[i].value} where id =${id};`);
                }
                else{
                    updateQuery=updateQuery.concat(`${props[i].prop}='${props[i].value}' where id =${id};`);
                }
                
            }
        }
        console.log(updateQuery);
        const updateFiles = await pool1.query(updateQuery);
        res.json("Zaposleni posodobljen.");
        
      } catch (error) {
          console.error(error.message);
      }
  });

  //brisanje obstoječega zaposlenega
  app.delete("/users/:id",async(req,res) =>{
      try {
          const {id} = req.params;
          const deleteFile = await pool1.query("DELETE FROM datoteke where id= $1",[id]);
          res.json("File was deleted.");
      } catch (error) {
          console.error(error.message);
      }
  });
  
  //podatki o vseh projektih
  app.get("/files",async(req,res) => {
      try {
          const vseDatoteke= await pool1.query("SELECT * from datoteke");
          res.json(vseDatoteke.rows);
      } catch (error) {
          console.error(error.message);
      }
  });

  //vsi podatki o datotekah na nivoju 0
  app.get("/projects",async(req,res) => {
      try {
        const aboutProjekti = await pool1.query("SELECT * from datoteke where nivo=0");
        //res.json("datoteke updejtane");
        res.json(aboutProjekti.rows);
      } catch (error) {

          console.error(error.message);
      }
  });

  
  //podatki o tocno dolocenem projektu
  //rekurzivno pridobivanje podatkov iz baze --> tree traversal
  app.get("/projects/:id",async(req,res) => {
      try {
        const {id}= req.params;
        const aboutProjekti = await pool1.query("WITH recursive dat AS(select * from datoteke where id = $1 union ALL select d.* from dat inner join datoteke d on d.stars_id = dat.id) select * from dat",[id]);
        res.json(aboutProjekti.rows);    
      } catch (error) {
          console.error(error.message);
      }
  });


  //add project --> dodajanje nivoja 0 in osnovnih podatkov o projektu...
  //to je lahko tudi za dodajanje datotek na splošno, samo nastavit moraš nivo...
  //TODO: dodaj kdaj je bil urejen in kdo ga je urejal..
  app.post("/projects",async (req,res) => {
      try {
        const {ime} = req.body;
        const {opis} = req.body;
        const {povezava} = req.body;
        const {stars_id}= req.body;
        const {nivo} = req.body;
        const {vidijolahko} = req.body;
        const {urejal} = req.body;
        const {lastnik} = req.body;
        const newProject= await pool1.query(
            "insert into datoteke(ime,opis,povezava,stars_id,nivo,vidijolahko) values($1,$2,$3,$4,$5,$6) returning *",
            [ime,opis,povezava,stars_id,nivo,vidijolahko]);
        res.json(newProject.rows[0]);
        
      } catch (error) {
          console.error(error.message);
      }
  });
  
  //izbrisi datoteko s podanim id
  app.delete("/file/:id",async (req,res) => {
    try {
        const {id} = req.params;
        const deleteFile = await pool1.query("DELETE FROM datoteke where id= $1",[id]);
        res.json("File was deleted.");
    } catch (error) {
        console.error(error.message);
    }
});

//izbrisi vse datoteke povezane z projektom
// rekurzivno s esprehodi cez drevo in izbrisi vsak node ki ga ne rabis vec
app.delete("/projects/:id",async (req,res) => {
    try {
        const {id} = req.params;
        // const deleteFile = await pool1.query("DELETE FROM datoteke where id= $1",[id]);
        const aboutProjekti = await pool1.query("WITH recursive dat AS(select * from datoteke where id = $1 union ALL select d.* from dat inner join datoteke d on d.stars_id = dat.id) delete from datoteke where id in (select id from dat)",[id]);
        res.json("File was deleted.");
    } catch (error) {
        console.error(error.message);
    }
});


//spreminjaj podatke o datoteki s podanim id
app.put("/projects/:id", async (req,res) =>{
    try {
        const {id} = req.params;
        let props: { prop: string, value:any }[] = [];
        
        const body= req.body;
        if(body.hasOwnProperty('ime')){
            props.push({prop:'ime',value:body.ime});
        }
        if(body.hasOwnProperty('opis')){
            
            props.push({prop:'opis',value:body.opis});
        }
        if(body.hasOwnProperty('povezava')){
            props.push({prop:'povezava',value:body.povezava});
        }
        if(body.hasOwnProperty('stars_id')){
            props.push({prop:'stars_id',value:body.stars_id});
        }
        if(body.hasOwnProperty('spremenjen')){
            props.push({prop:'spremenjen',value:body.spremenjen});
        }
        if(body.hasOwnProperty('urejal')){
            props.push({prop:'urejal',value:body.urejal});
        }
        if(body.hasOwnProperty('vidijolahko')){
            props.push({prop:'vidijolahko',value:body.vidijolahko});
        }
        let updateQuery:string ="UPDATE datoteke set ";
        for(let i= 0;  i <props.length;i++){
            if(i < props.length-1){
                if(props[i].prop === "stars_id" || props[i].prop === "urejal"){

                    updateQuery=updateQuery.concat(`${props[i].prop}=${props[i].value}, `);
                }
                else{
                    updateQuery=updateQuery.concat(`${props[i].prop}='${props[i].value}', `);
                }
            }
            else{
                if(props[i].prop === "stars_id" || props[i].prop === "urejal"){

                    updateQuery=updateQuery.concat(`${props[i].prop}=${props[i].value} where id =${id};`);
                }
                else{
                    updateQuery=updateQuery.concat(`${props[i].prop}='${props[i].value}' where id =${id};`);
                }
                
            }
        }
        console.log(updateQuery);
        const updateFiles = await pool1.query(updateQuery);
        res.json("datoteka updejtana");
        
      } catch (error) {
          console.error(error.message);
      }
});

//pridobi vse podatke od vseh oddelkih
app.get("/oddelki",async (req,res) => {
    try {
        const vseDatoteke= await pool1.query("SELECT * from oddelki");
        res.json(vseDatoteke.rows);
    } catch (error) {
        console.error(error.message);
    }
});



app.listen(5000, () => {
  console.log("server started on port 5000");
});
