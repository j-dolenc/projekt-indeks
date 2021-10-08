import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import classes from './App.module.css';
import NavBar from './components/layout/NavBar';
import AddProject from './components/pages/AddProject';
import MainPage from './components/pages/MainPage';
import ProjectPage from './components/pages/ProjectPage';
import Search from './components/pages/Search';

function App() {

  let dataNivo0:{
    id:number,
    ime:string,
    lastnik:string,
    spremenjen:string,
    }[] = [];
    const getData = async () => {
      try {
        const response = await fetch(`http://192.168.38.164:5000/projects`);
        const jsonData = await response.json();
        console.log(jsonData);
        for (let i = 0; i < jsonData.length; i++) {
          dataNivo0.push({
            id: jsonData[i].id,
            ime: jsonData[i].ime,
            lastnik: jsonData[i].lastnik,
            spremenjen: jsonData[i].spremenjen.toString(),
          });
        }
      console.log(dataNivo0);
      } catch (error: any) {
        console.error(error.message);
      }
    };
    getData();
  return (
    <div className={classes.app}>
      <NavBar/>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route path="/home" exact>
        <MainPage/>
      </Route>
      <Route path="/search" exact>
        <Search data={dataNivo0}/>
      </Route>
      <Route path="/project" exact> {/*poglej kako bos naredu tale redirect za projectpage*/ }
        <ProjectPage/>
      </Route>
      <Route path="/project/:id" exact>
        <ProjectPage/>
      </Route>
      <Route path="/add" exact>
        <AddProject/>
      </Route>
    </div>
  );
}

export default App;
