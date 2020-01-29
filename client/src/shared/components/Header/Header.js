import React, { useContext } from 'react';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

const Header = () => {
  const auth = useContext(AuthContext);
  return (
    <div className={classes.header}>
      <div className={classes.container}>
        <div className="row">
          <div className="col-7">
            <div className={classes.logo}>
              <span>E</span>eeeevent
            </div>
          </div>
          <div className={'col-5 text-nowrap ' + classes.navigation}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/events">All events</NavLink>
            <NavLink to="/">Calendar</NavLink>
            {!auth.isLoggedIn && (
              <NavLink to="/auth">
                <button className="btn btn-outline-success btn-block">
                  Sign In
                </button>
              </NavLink>
            )}
            {auth.isLoggedIn && (
              <NavLink to="/">
                <button
                  className="btn btn-outline-success btn-block"
                  onClick={auth.logout}
                >
                  Logout
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
