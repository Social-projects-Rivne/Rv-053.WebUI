import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

import './EventsResult.css';

import { returnAddress } from '../../shared/components/UI/Geocoding';
const EventResultItem = props => {
  const image = {
    backgroundImage: `url(${props.event.cover})`
  };
  const datetime = moment(+props.event.datetime)
    .format('DD MM YYYY')
    .split(' ')
    .join('.');

  const coordinates = props.event.location.split(',');
  const [address, setAddress] = useState();
  useEffect(() => {
    const geocodeObj = returnAddress(+coordinates[0], +coordinates[1]);
    geocodeObj.then(geocodeObj => {
      const geoComponent = geocodeObj.address_components;
      setAddress(
        `${geoComponent[2].long_name}, ${geoComponent[1].long_name} ${geoComponent[0].long_name}`
      );
    });
  }, []);
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
          <NavLink to={'profile/' + props.event.owner_id} className="link ">
            <div className="list__events-item-creator">
              {props.event.user.first_name + ' '}
              {props.event.user.last_name}
            </div>
          </NavLink>
          <div className="list__events-item-location">{address}</div>
          <div className="list__events-item-date">{datetime}</div>
        </div>
      </div>
    </NavLink>
  );
};

export default EventResultItem;
