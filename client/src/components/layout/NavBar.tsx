import classes from './NavBar.module.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
const NavBar = () => {
	return <div>
  <header className={classes["main-header"]}>
  <Link to="/home">
	<img
	  src={`${process.env.PUBLIC_URL}/Irgo_logo.png`}
	  alt="Home"
	  height={50}
	  width={125}
	/>
  </Link>
	 <nav className={classes.nav}>
      <ul>
        <li>
          <NavLink activeClassName={classes.active} to="/search">Search</NavLink>
        </li>

        <li>
          <NavLink activeClassName={classes.active} to="/add">Add Project</NavLink>
        </li>
        
        <li>
          <button>{`Jurij Dolenc`}</button>
        </li>
      </ul>
    </nav>
  </header>
  </div>;
}
export default NavBar;