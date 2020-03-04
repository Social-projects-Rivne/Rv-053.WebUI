import React from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

const EventResultItem = props => {
  const image = {
    backgroundImage: `url(${props.event.cover})`
  };
  const datetime = moment(+props.event.datetime)
    .format('DD MM YYYY')
    .split(' ')
    .join('.');

  return (
    <NavLink to={'event/' + props.event.id} className={props.className}>
      <div className="list__events-item-img" style={image}></div>
      <div className="list__events-item-info">
        <div className="list__events-item-top_info">
          <div className="list__events-item-description">
            <div className="list__events-item-title">{props.event.name}</div>
            <div className="list__events-item-category">{props.event.categories[0].category}</div>
            <div className="list__events-item-descr">{props.event.description}</div>
          </div>
          <div className="list__events-item-price">{props.event.price || 'Free'}</div>
        </div>
        <div className="list__events-item-bottom_info">
          <div className="list__events-item-creator">
            {props.event.user.first_name + ' '}
            {props.event.user.last_name}
          </div>
          <div className="list__events-item-location">{props.event.location}</div>
          <div className="list__events-item-date">{datetime}</div>
        </div>
      </div>
    </NavLink>
  );
};

export default EventResultItem;
