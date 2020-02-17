import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

import './Header.css';
import Logo from '../UI/Logo';
import Button from '../UI/Button';
import CalendarList from './CalendarList';
import CitiesList from './CitiesList';

const Header = () => {
  const [toggleCalendarState, settoggleCalendarState] = useState({ isShownCalendar: false });
  const [toggleCitiesState, settoggleCitiesState] = useState({ isShownCities: false });

  const toggleCalendarHandler = () => {
    let show = toggleCalendarState.isShownCalendar;
    settoggleCalendarState({ isShownCalendar: !show });
  };
  const toggleCitiesHandler = () => {
    let show = toggleCitiesState.isShownCities;
    settoggleCitiesState({ isShownCities: !show });
  };

  const auth = useContext(AuthContext);
  return (
    <header className="header">
      <div className="my__container">
        <div className="header__inner">
          <div className="header__logo">
            <Logo />
          </div>
          <form className="form__search_event">
            <input type="text" className="header__search" placeholder="Search event.." />
            <button className="header__submit"></button>
          </form>
          <div className="header__nav">
            <button className="header__calendar" onClick={toggleCalendarHandler}></button>
            {toggleCalendarState.isShownCalendar ? <CalendarList /> : null}
            <button className="header__cities" onClick={toggleCitiesHandler}>
              Kyiv
            </button>
            {toggleCitiesState.isShownCities ? <CitiesList /> : null}
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
