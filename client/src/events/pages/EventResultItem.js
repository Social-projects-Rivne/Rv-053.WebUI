import React from 'react';
import { NavLink } from 'react-router-dom';

const EventResultItem = props => {
  return (
    <div className={props.className}>
      <div className="list__events-item-img">
        <img src="cover" alt="" />
      </div>
      <div className="list__events-item-info">
        <div className="list__events-item-top_info">
          <div className="list__events-item-description">
            <div className="list__events-item-title">{props.title}</div>
            <div className="list__events-item-category">{props.category}</div>
            <div className="list__events-item-descr">{props.description}</div>
          </div>
          <div className="list__events-item-price">{props.price}</div>
        </div>
        <div className="list__events-item-bottom_info">
          <div className="list__events-item-creator">Oleksandr</div>
          <div className="list__events-item-location">{props.location}</div>
          <div className="list__events-item-date">{props.date}</div>
        </div>
      </div>
    </div>
  );
};

export default EventResultItem;
