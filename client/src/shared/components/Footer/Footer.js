import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import Logo from '../UI/Logo';
import './Footer.css';
import Countdown from '../UI/CountDownTimer';

const Footer = () => {
  const isLoggedIn = useContext(AuthContext);
  return (
    <React.Fragment>
      <Countdown
        timeTillDate='03 28 2019, 6:00 am'
        timeFormat='MM DD YYYY, h:mm a'
      />
      <footer className='footer'>
        <div className='container'>
          <div className='footer_inner'>
            <div className='footer__logo'>
              <Logo />
            </div>
            <div className='footer__content'>
              <div className='footer__col'>
                <span className='footer__col-title'>Your account</span>
                <ul className='footer__list'>
                  <li>
                    <NavLink to='/auth' className='link-light'>
                      Sign in
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/auth' className='link-light'>
                      Sign up
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/auth' className='link-light'>
                      Signout
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className='footer__col'>
                <span className='footer__col-title'>Discover</span>
                <ul className='footer__list'>
                  <li>
                    <NavLink to='/events' className='link-light'>
                      All events
                    </NavLink>
                  </li>
                  <li>View hubs</li>
                  <li>
                    <NavLink to='/events' className='link-light'>
                      Search events
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={isLoggedIn ? '/addevent' : '/auth'}
                      className='link-light'
                    >
                      Create Event
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className='footer__col'>
                <span className='footer__col-title'>Eeeevent</span>
                <ul className='footer__list'>
                  <li>
                    <NavLink to='/' className='link-light'>
                      Home
                    </NavLink>
                  </li>
                  <li>About</li>
                </ul>
              </div>
              <div className='footer__col-follow'>
                <span className='footer__col-title'>Follow us</span>
                <ul className='footer__list'>
                  <li className='social social-instagram'></li>
                  <li className='social social-facebook'></li>
                  <li className='social social-google'></li>
                  <li className='social social-github'>
                    <a
                      href='https://github.com/Social-projects-Rivne/Rv-053.WebUI'
                      className='link-light'
                    ></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className='footer__privacy'>Eeeeevent 2020</div>
    </React.Fragment>
  );
};

export default Footer;
