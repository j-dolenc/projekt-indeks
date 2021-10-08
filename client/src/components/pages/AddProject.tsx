import classes from "./AddProject.module.css";
import { Field, Formik } from "formik";
import DropDown from "../layout/DropDown";
import { json } from "express";
import { useState } from "react";
const AddProject = () => {
	
	const [imeProjekta,setImeProjekta] = useState(false);
	const [pot, setPot] = useState(false);
	let validated = false;
	if(imeProjekta && pot){
		validated = !validated;
	}






	let data:{value:string,label:string}[]=[];
	const onSubmitHandler = async (event: React.FormEvent) => {
		event.preventDefault();
	}

	const getOptions =async() => {
		try {
			const response = await fetch("http://192.168.38.164:5000/users");
			const jsonZaposleni = await response.json();
            //console.log(jsonData);
			//dodaj v data
			for(let i = 0; i <jsonZaposleni.length; i++){
				let option = { 
					value: jsonZaposleni[i].id,
					label: jsonZaposleni[i].username 
				};

				data.push(option)
			}

		} catch (error:any) {
			console.error(error.message);
		}
		try {
			const response = await fetch("http://192.168.38.164:5000/oddelki");
			const jsonOddelki = await response.json();
			
			for(let i = 0; i <jsonOddelki.length; i++){
				let option = { 
					value: `od${jsonOddelki[i].id}`,
					label: jsonOddelki[i].ime
				};

				data.push(option)
			}

		} catch (error:any) {
			console.log(error.message);
		}
	}
	getOptions();


  return (
    <section className={classes.main}>
      <div>
        <h1>Ustvari Nov Projekt:</h1>
      </div>
      <div>
        {/* <Formik>
			  initialValues={{imeProjekta}}
		  </Formik> */}
        <form onSubmit={onSubmitHandler}>
          <div className={classes.control}>
            <label htmlFor="projectName">Ime Projekta</label>
            <input placeholder="eg. Karavanke" type="text" id="projectName"></input>
          </div>
          <div className={classes.control}>
            <label htmlFor="path">Absolutna Pot Do Projekta</label>
            <input placeholder=" eg. C:\mojiDokumenti/mojProjekt" type="text" id="path"></input>
          </div>
          <div className={classes.control}>
            <label htmlFor="description">Opis Projekta</label>
            <input placeholder="Vse datoteke za moj najljubši projekt." type="text" id="description"></input>
          </div>
          <div className={classes.control}>
            <label>Lahko Ga Vidijo</label>
            <DropDown data={data} />
          </div>
          {/* moznost, kdo lahko vidi projekt, naredi
            z izbiro večih moćnosti.... svoja komponenta... */}
			<div className={classes.actions}>
				<button type="submit">Ustvari Projekt</button>
			</div>
        </form>
      </div>
    </section>
  );
};
export default AddProject;