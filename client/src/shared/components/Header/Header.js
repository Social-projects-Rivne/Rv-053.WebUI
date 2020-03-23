import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

import './Header.css';
import Logo from '../UI/Logo';
import CalendarList from './CalendarList';
import Search from '../../../events/components/search';

const Header = () => {
  const [toggleCalendarState, settoggleCalendarState] = useState(false);

  const toggleCalendarHandler = () => {
    let show = toggleCalendarState;
    settoggleCalendarState(!show);
  };

  const auth = useContext(AuthContext);
  return (
    <header className="header">
      <div className="my__container">
        <div className="header__inner">
          <div className="header__logo">
            <Logo />
          </div>
          <Search />
          <div className="header__nav">
            <button
              className="header__calendar"
              onClick={toggleCalendarHandler}
              onBlur={() => {
                settoggleCalendarState(false);
              }}
            ></button>
            <NavLink className="header__nav-link" to="/events">
              All events
            </NavLink>
            {auth.isLoggedIn && (
              <NavLink className="header__nav-link" to="/profile/my">
                Profile
              </NavLink>
            )}
            {!auth.isLoggedIn && (
              <NavLink className="header__nav-link" to="/auth">
                Sign In
              </NavLink>
            )}
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

export default Header;
