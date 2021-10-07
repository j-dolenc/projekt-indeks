import { useState } from 'react';
import classes from './Search.module.css';
import { useRef } from 'react';
import Scroll from '../layout/Scroll';
import SearchList from '../layout/SearchList';
const Search = () => {
	let data=[{
		id:1,
		ime:"Moje ime",
		lastnik:"Jurij",
		spremenjen:"2.5.2021"
	},{
		id:2,
		ime:"Karavanke",
		lastnik:"Matevž",
		spremenjen:"2.6.2021"
	},
	{
		id:1,
		ime:"Moje ime",
		lastnik:"Jurij",
		spremenjen:"2.5.2021"
	},{
		id:2,
		ime:"Karavanke",
		lastnik:"Matevž",
		spremenjen:"2.6.2021"
	},
	{
		id:1,
		ime:"Moje ime",
		lastnik:"Jurij",
		spremenjen:"2.5.2021"
	},{
		id:2,
		ime:"Karavanke",
		lastnik:"Matevž",
		spremenjen:"2.6.2021"
	}];
	
	const [search, setSearch] = useState("");
	const searchRef = useRef<HTMLInputElement>(null);
	const handleChange= (e: React.FormEvent<HTMLInputElement>) => {
		setSearch(e.currentTarget.value);
	}
	const filtered = data.filter(
		projekt => {
		  return (
			projekt
			.ime
			.toLowerCase()
			.includes(search.toLowerCase()) ||
			projekt
			.lastnik
			.toLowerCase()
			.includes(search.toLowerCase())
		  );
		}
	  );

	return <section className={classes.main}>
		<div className={classes.naslov}>
			<h1>Poišči Projekt</h1>
		</div>
		<div>
			<input type="search" placeholder="Poišči Projekt" onChange={handleChange}/>
		</div>
		<Scroll >
			<SearchList filtriraniProjekti={filtered}/>
		</Scroll>
	</section>;
}
export default Search;