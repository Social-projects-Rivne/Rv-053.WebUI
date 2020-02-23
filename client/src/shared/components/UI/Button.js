import React from 'react';
import { NavLink } from 'react-router-dom';

const Button = props => {
  return (
    <button type={props.type} className="my__button" onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
