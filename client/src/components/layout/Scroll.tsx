import classes from './Scroll.module.css';
import { ReactChild } from 'react';
const Scroll: React.FC <{children:| React.ReactChild| React.ReactChild[]}> = (props) => {
	return <div className={classes.scroll}>
		{props.children}
	</div>
}
export default Scroll;