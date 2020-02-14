import React, { Fragment } from 'react';

import Logo from '../UI/Logo';
import './Footer.css';

const Footer = () => {
  return (
    <React.Fragment>
      <footer class="footer">
        <div class="container">
          <div class="footer_inner">
            <div class="footer__logo">
              <Logo />
            </div>
            <div class="footer__content">
              <div class="footer__col">
                <span class="footer__col-title">Your account</span>
                <ul class="footer__list">
                  <li>Sign in</li>
                  <li>Sign up</li>
                </ul>
              </div>
              <div class="footer__col">
                <span class="footer__col-title">Discover</span>
                <ul class="footer__list">
                  <li>All events</li>
                  <li>View hubs</li>
                  <li>Search event</li>
                  <li>Create event</li>
                </ul>
              </div>
              <div class="footer__col">
                <span class="footer__col-title">Eeeevent</span>
                <ul class="footer__list">
                  <li>Home</li>
                  <li>About</li>
                </ul>
              </div>
              <div class="footer__col-follow">
                <span class="footer__col-title">Follow us</span>
                <ul class="footer__list">
                  <li class="social social-instagram"></li>
                  <li class="social social-facebook"></li>
                  <li class="social social-google"></li>
                  <li class="social social-github"></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div class="footer__privacy">Eeeeevent 2020</div>
    </React.Fragment>
  );
};

export default Footer;
