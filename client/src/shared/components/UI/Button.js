import React from 'react';
import { NavLink } from 'react-router-dom';

import './Button.css';

const Button = props => {
  return (
    <React.Fragment>
      {props.sort == 'button' ? (
        <button className="button">{props.children}</button>
      ) : (
        <NavLink className="button" to="{props.to}"></NavLink>
      )}
    </React.Fragment>
  );
};

export default Button;
