import React from 'react';
import { NavLink } from 'react-router-dom';

const EventResultItem = props => {
  const image = {
    backgroundImage: `url(${props.cover})`
  };
  return (
    <NavLink to={'event/' + props.id} className={props.className}>
      <div className="list__events-item-img" style={image}></div>
      <div className="list__events-item-info">
        <div className="list__events-item-top_info">
          <div className="list__events-item-description">
            <div className="list__events-item-title">{props.title}</div>
            <div className="list__events-item-category">{props.category || 'Sport'}</div>
            <div className="list__events-item-descr">{props.description}</div>
          </div>
          <div className="list__events-item-price">{props.price || '500 UAH'}</div>
        </div>
        <div className="list__events-item-bottom_info">
          <div className="list__events-item-creator">{props.owner || 'Oleksandr'}</div>
          <div className="list__events-item-location">{props.location}</div>
          <div className="list__events-item-date">{props.date}</div>
        </div>
      </div>
    </NavLink>
  );
};

export default EventResultItem;
