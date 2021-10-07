import classes from './MainPage.module.css';
const MainPage = () => {

	//TODO: usposobi spodnje tri gumbke...


	return <section className={classes.main}>
	<h1>{`Pozdravljen/a Jurij`}</h1>
	<h2>Kaj je projekt Index</h2>
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
		<button className={classes.btn}>Odpri Projekt</button>
		<button className={classes.btn}>Ustvari Projekt</button>
		<button className={classes.btn}>Log Out</button>
	  </div>
	</div>
  </section>
}
export default MainPage;