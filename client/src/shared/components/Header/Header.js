import React from 'react';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.css';

const Header = () => {
	return (
		<div className={classes.header}>
			<div className={classes.container}>
				<div className="row">
					<div className="col-8">
						<div className={classes.logo}>
							<span>E</span>eeeevent
						</div>
					</div>
					<div className={'col-4 ' + classes.navigation}>
						
						<NavLink to="/">Home</NavLink>
						<NavLink to="/events">All events</NavLink>
						<NavLink to="/">Calendar</NavLink>
						<NavLink to="/auth">
							<input type="submit" className="btn btn-outline-success" value="Sign In"></input>
						</NavLink>
						
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
