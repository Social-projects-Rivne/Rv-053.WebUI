import React from 'react';
import { NavLink } from 'react-router-dom';

import './Logo.css';

const Logo = () => {
  return (
    <React.Fragment>
      <NavLink to="/">
        <img src="/src/img/logo.png" alt="nothing" className="logo" />
      </NavLink>
    </React.Fragment>
  );
};

export default Logo;
