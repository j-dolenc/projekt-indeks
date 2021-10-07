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
import MainPage from './components/pages/MainPage';
import ProjectPage from './components/pages/ProjectPage';
import Search from './components/pages/Search';

function App() {
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
        <Search/>
      </Route>
      <Route path="/project" exact>
        <ProjectPage/>
      </Route>
    </div>
  );
}

export default App;
