import React from 'react';
import { NavLink } from 'react-router-dom';

const EventCalleryItem = ({ key, image, className, description }) => {
  const img = {
    backgroundImage: `url(${image})`
  };
  return (
    <div className={className}>
      <NavLink
        to={'/event/9'}
        style={img}
        className="list__images-item-img"
      ></NavLink>
      <div>{description}</div>
    </div>
  );
};
export default EventCalleryItem;
