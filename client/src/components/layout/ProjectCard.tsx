const ProjectCard: React.FC <{imeProjekta:string,lastnik:string,datumSpreminjanja:string}> = (props) => {
	return <div>
		<div>
			<h2>{props.imeProjekta}</h2>
			<h3>{props.lastnik}</h3>
			<p>{props.datumSpreminjanja}</p>
		</div>
	</div>
};
export default ProjectCard;