import classes from './NavBar.module.css';
const NavBar = () => {
	return <header className={classes["main-header"]}>
	<img
	  src={`${process.env.PUBLIC_URL}/Irgo_logo.png`}
	  alt="Home"
	  height={50}
	  width={125}
	/>
	 <nav className={classes.nav}>
      <ul>
        <li>
          <a href="/">Search</a>
        </li>

        <li>
          <a href="/">Add Project</a>
        </li>
        
        <li>
          <button>{`Jurij Dolenc`}</button>
        </li>
      </ul>
    </nav>
  </header>;
}
export default NavBar;