import Select from 'react-select'
import classes from './DropDown.module.css';
const DropDown: React.FC <{data:{value:string,label:string}[]}> = (props) => {
	//uporabi propse da dobis option zato da jih 
	//lazje uporbis pol v addProject komponenti
	
	  
	return <Select className={classes.drop}
			placeholder="Izberi, kdo bo lahko dostopal do tvojega projetka"
			closeMenuOnSelect={false}
      		isMulti
      		options={props.data} />;

}
export default DropDown;