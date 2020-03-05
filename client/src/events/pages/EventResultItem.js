import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { returnAddress } from '../../shared/components/UI/Geocoding';
const EventResultItem = props => {
  const image = {
    backgroundImage: `url(${props.cover})`
  };
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
  }, []);

  return (
    <NavLink to={'event/' + props.id} className={props.className}>
      <div className='list__events-item-img' style={image}></div>
      <div className='list__events-item-info'>
        <div className='list__events-item-top_info'>
          <div className='list__events-item-description'>
            <div className='list__events-item-title'>{props.title}</div>
            <div className='list__events-item-category'>{props.category}</div>
            <div className='list__events-item-descr'>{props.description}</div>
          </div>
          <div className='list__events-item-price'>{props.price || 'Free'}</div>
        </div>
        <div className='list__events-item-bottom_info'>
          <div className='list__events-item-creator'>
            {props.user.first_name + ' '}
            {props.user.last_name}
          </div>
          <div className='list__events-item-location'>{address}</div>
          <div className='list__events-item-date'>{props.date}</div>
        </div>
      </div>
    </NavLink>
  );
};

export default EventResultItem;
