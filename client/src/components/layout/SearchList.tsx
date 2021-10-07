import ProjectCard from "./ProjectCard";


const SearchList: React.FC <{filtriraniProjekti:{id:number,ime:string,lastnik:string,spremenjen:string}[]}> = (props) => {
	const filter = props.filtriraniProjekti.map(projekt => <ProjectCard key={projekt.id} imeProjekta={projekt.ime} lastnik={projekt.lastnik} datumSpreminjanja={projekt.spremenjen}/>);
	return <div>
		{filter}
	</div>
}
export default SearchList;