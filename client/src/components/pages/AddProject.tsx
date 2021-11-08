import classes from "./AddProject.module.css";
import { Field, Formik } from "formik";
import DropDown from "../layout/DropDown";
import { json } from "express";
import { useRef, useState } from "react";
const AddProject = () => {
	
	//TODO: validation
	//TODO: POST
	//TODO: Redirect
	const imeProjektaRef = useRef<string>("");
	const potRef = useRef<string>("");
	const [imeProjektaValid,setImeProjektaValid] = useState(false);
	const [potValid, setPotValid] = useState(false);

	let validated = false;
	if(imeProjektaValid && potValid) validated = true;
	else validated = false;

	console.log(validated);





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

	const onChangeImeHandler =() =>{
		if(imeProjektaRef.current.length !== 0){
			setImeProjektaValid(true);
		}
		else{
			setImeProjektaValid(false);
		}
		if(imeProjektaValid && potValid){
			validated = true;
		}
	
	
	}
	const onChangePotHandler =() =>{
		if(potRef.current.length !== 0){
			setPotValid(true);
		}
		else{
			setPotValid(false);
		}
		if(imeProjektaValid && potValid){
			validated = true;
		}
	
	
	}
	//let classGumb= validated? "classes.actions" :"classes.invalid";
	
  return (
    <section className={classes.main}>
      <div>
        <h1>Ustvari Nov Projekt:</h1>
      </div>
      <div>
        <form onSubmit={onSubmitHandler}>
          <div className={classes.control}>
            <label htmlFor="projectName">Ime Projekta</label>
            <input placeholder="eg. Karavanke" type="text" id="projectName" onChange={onChangeImeHandler}></input>
          </div>
          <div className={classes.control}>
            <label htmlFor="path">Absolutna Pot Do Projekta</label>
            <input placeholder=" eg. C:\mojiDokumenti/mojProjekt" type="text" id="path" onChange={onChangePotHandler}></input>
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
				<button type="submit" disabled={false}>Ustvari Projekt</button>
			</div>
        </form>
      </div>
    </section>
  );
};
export default AddProject;