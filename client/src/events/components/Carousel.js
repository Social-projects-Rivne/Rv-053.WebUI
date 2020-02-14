import React, { Component } from 'react';

import './Carousel.css';

class Carousel extends Component {
  render() {
    return (
      <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://theoxfordmagazine.com/wp-content/uploads/oxford-festival-of-arts-2019-1920x756.jpg"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel__content">
              <div class="slider__inner">
                <div class="slider__title">Create And Organize Your Own Event</div>
                <a href="" class="slider__btn">
                  Create Event
                </a>
              </div>{' '}
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://theoxfordmagazine.com/wp-content/uploads/oxford-festival-of-arts-2019-1920x756.jpg"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel__content">
              <div class="slider__inner">
                <div class="slider__title">Create And Organize Your Own Event</div>
                <a href="" class="slider__btn">
                  Create Event
                </a>
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
    );
  }
}

export default Carousel;
