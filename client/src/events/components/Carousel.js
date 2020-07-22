import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from './../../shared/context/auth-context';
import './Carousel.css';

const Carousel = () => {
  const isLoggedIn = useContext(AuthContext).isLoggedIn;
  return (
    <section className="carousel">
      <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="3"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="http://localhost:5001/uploads/covers/carousel1.jpg"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel__content">
              <div className="slider__inner">
                <div className="slider__title">Create And Organize Your Own Event</div>
                <NavLink to={isLoggedIn ? '/addevent' : '/auth'} className="link-btn">
                  Create Event
                </NavLink>
              </div>{' '}
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="http://localhost:5001/uploads/covers/carousel2.jpg"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel__content">
              <div className="slider__inner">
                <div className="slider__title">Create And Organize Your Own Event</div>
                <NavLink to={isLoggedIn ? '/addevent' : '/auth'} className="link-btn">
                  Create Event
                </NavLink>
              </div>{' '}
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="http://localhost:5001/uploads/covers/carousel3.jpg"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel__content">
              <div className="slider__inner">
                <div className="slider__title">Create And Organize Your Own Event</div>
                <NavLink to={isLoggedIn ? '/addevent' : '/auth'} className="link-btn">
                  Create Event
                </NavLink>
              </div>{' '}
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="http://localhost:5001/uploads/covers/carousel4.jpg"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel__content">
              <div className="slider__inner">
                <div className="slider__title">Create And Organize Your Own Event</div>
                <NavLink to={isLoggedIn ? '/addevent' : '/auth'} className="link-btn">
                  Create Event
                </NavLink>
              </div>{' '}
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleCaptions"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleCaptions"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </section>
  );
};

export default Carousel;
