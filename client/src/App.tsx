import React from 'react';

import classes from './App.module.css';
import NavBar from './components/layout/NavBar';
import MainPage from './components/pages/MainPage';

function App() {
  return (
    <div className={classes.app}>
      <NavBar/>
      <MainPage/>
    </div>
  );
}

export default App;
