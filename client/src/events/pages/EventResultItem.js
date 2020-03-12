import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

import './EventsResult.css';

import { returnAddress } from '../../shared/components/UI/Geocoding';
const EventResultItem = props => {
  const image = {
    backgroundImage: `url(${props.cover})`
  };
  const datetime = moment(+props.datetime)
    .format('DD MM YYYY')
    .split(' ')
    .join('.');

  const coordinates = props.location.split(',');
  const [address, setAddress] = useState();
  useEffect(() => {
    const geocodeObj = returnAddress(+coordinates[0], +coordinates[1]);
    geocodeObj.then(geocodeObj => {
      const geoComponent = geocodeObj.address_components;
      setAddress(
        `${geoComponent[2].long_name}, ${geoComponent[1].long_name} ${geoComponent[0].long_name}`
      );
    });
  }, [coordinates]);

  return (
    <div className={props.className}>
      <NavLink
        to={'event/' + props.id}
        className="list__events-item-img"
        style={image}
      ></NavLink>
      <div className="list__events-item-info">
        <div className="list__events-item-top_info">
          <div className="list__events-item-description">
            <div className="list__events-item-title">{props.name}</div>
            <div className="list__events-item-category">{props.category}</div>
            <div className="list__events-item-descr">{props.description}</div>
          </div>
          <div className="list__events-item-price">{props.price || 'free'}</div>
        </div>
        <div className="list__events-item-bottom_info">
          <NavLink to={'profile/' + props.owner_id} className="link ">
            <div className="list__events-item-creator">
              {props.first_name + ' '}
              {props.last_name}
            </div>
          </NavLink>
          <div className="list__events-item-location">{address}</div>
          <div className="list__events-item-date">{datetime}</div>
        </div>
      </div>
    </div>
  );
};

export default EventResultItem;
