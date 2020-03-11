import React from 'react';
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
    slidesToShow: +props.slidesToShow,
    slidesToScroll: +props.slidesToScroll,
    arrows: props.arrows || false,
    dots: props.dots ||false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: +props.slidesToShow === 1 ? 1 : 3 & +props.slidesToShow === 2 ? 2 : 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: +props.slidesToShow === 1 ? 1 : 2,
          slidesToScroll: 2
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
