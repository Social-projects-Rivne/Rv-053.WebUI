import React from 'react';
import { NavLink } from 'react-router-dom';

import './Button.css';

const Button = props => {
  return <button className="button">{props.children}</button>;
};

export default Button;
