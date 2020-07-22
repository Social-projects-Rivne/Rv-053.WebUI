import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../UI/Logo';
import { AuthContext } from '../../context/auth-context';

const AdminHeader = () => {
  const auth = useContext(AuthContext);
  return (
    <header className="header">
      <div className="my__container">
        <div className="header__inner">
          <div className="header__logo">
            <Logo />
          </div>
          <div className="header__nav">
            {auth.isLoggedIn && (
              <NavLink className="header__nav-link" to="/" onClick={auth.logout}>
                Signout
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
