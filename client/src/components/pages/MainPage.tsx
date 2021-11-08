
import classes from "./MainPage.module.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";


const MainPage = () => {
  //TODO: usposobi spodnje tri gumbke...

  return (
    <section className={classes.main}>
      <h1>{`Pozdravljen/a Jurij`}</h1>
      <h2>Kaj je projekt Index?</h2>
      <h3>Projekt Index je preprost pomočnik, ki ga lahko uporabite za:</h3>
      <ul>
        <li>boljši pregled nad svojimi projetki</li>
        <li>urejanje projektov</li>
        <li>dodajanje opisov datotekam</li>
        <li>urejanje struktur projektov</li>
      </ul>
      <div>
        <h2>Pričnite z delom:</h2>
        <div className={classes.btngrp}>
          <NavLink activeClassName={classes.active} to="/search">
            <button className={classes.btn}>Odpri Projekt</button>
          </NavLink>
          <NavLink activeClassName={classes.active} to="/add">
            <button className={classes.btn}>Ustvari Projekt</button>
          </NavLink>
          <NavLink activeClassName={classes.active} to="/login">
            <button className={classes.btn}>Log Out</button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};
export default MainPage;
