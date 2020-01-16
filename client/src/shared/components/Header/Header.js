import React from 'react';
import classes from './Header.module.css'
import 'bootstrap/dist/css/bootstrap.css';

const Header = () => {
  return(
    <div className={classes.header}>    
      <div className={classes.container}> 
        <div className="row">
          <div className="col-9">
            <div className={classes.logo}>
              <span>E</span>eevent
            </div>
          </div>
          <div className={"col-3 " + classes.navigation}>
            <a href="#">Home</a>
            <a href="#">All events</a>
            <a href="#">Calendar</a>
          </div>
        </div>
      </div>
    </div>   
)};
  

export default Header;