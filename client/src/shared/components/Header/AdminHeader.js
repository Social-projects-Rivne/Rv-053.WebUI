import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './AdminHeader.module.css';

const AdminHeader = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <span className="navbar-brand">Admin Panel</span>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="navbar-nav mr-auto">
          <div className="nav-item">
            <NavLink className={classes.nav} to="/">
              Home
            </NavLink>
          </div>
          <div className="nav-item">
            <NavLink className={classes.nav} to="/adminpanelpage">
              Dashboard
            </NavLink>
          </div>
          <div className="nav-item">
            <NavLink className={classes.nav} to="/adminpanelpage/users">
              Users
            </NavLink>
          </div>
          <div className="nav-item">
            <NavLink className={classes.nav} to="/adminpanelpage/events">
              Events
            </NavLink>
          </div>
          <div className="nav-item">
            <NavLink className={classes.nav} to="/adminpanelpage/logs">
              Logs
            </NavLink>
          </div>
        </div>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          ></input>
          <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default AdminHeader;
