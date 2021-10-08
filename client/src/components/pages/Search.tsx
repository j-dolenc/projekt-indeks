import { useState } from "react";
import classes from "./Search.module.css";
import { useRef } from "react";
import Scroll from "../layout/Scroll";
import SearchList from "../layout/SearchList";

const Search: React.FC <{data:{
	id:number,
	ime:string,
	lastnik:string,
	spremenjen:string,
  }[]}> = (props) => {
    //TODO: onclick redirect
  
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };
  const filtered = props.data.filter((projekt) => {
    return (
      projekt.ime.toString().toLowerCase().includes(search.toLowerCase()) ||
      projekt.lastnik.toString().toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <section className={classes.main}>
      <div className={classes.naslov}>
        <h1>Poišči Projekt</h1>
      </div>
      <div className={classes.bar}>
        <input
          type="search"
          placeholder="Poišči Projekt"
          onChange={handleChange}

        />
      </div>
      <Scroll>
        <SearchList filtriraniProjekti={filtered} />
      </Scroll>
    </section>
  );
};
export default Search;
