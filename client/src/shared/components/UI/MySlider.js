import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';

import './MySlider.css';

const MySlider = props => {
  function PrevArrow(props) {
    return <button className="slick-arrow slick-prev" onClick={props.onClick}></button>;
  }
  function NextArrow(props) {
    return <button className="slick-arrow slick-next" onClick={props.onClick}></button>;
  }
  const slider = {
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true
        }
      }
    ]
  };

  return <Slider {...slider}>{props.children}</Slider>;
};

export default MySlider;
