import classes from './ProjectPage.module.css';
import ProjectOptions from '../layout/ProjectOptions';
import ProjectTree from '../layout/ProjectTree';
const ProjectPage = () => {
	return (
	<div className={classes.project}>
		{/* <p>Ime projekta</p>  */}
		<div className={classes.box}>
		{/* <p>Tukaj bo prikazan projekt...Nova komponenta</p> */}

		<ProjectTree />
		</div>
		{/* <div className={classes.options}>
		<ProjectOptions />
		</div> */}
	</div>
	);	
};
export default ProjectPage;
