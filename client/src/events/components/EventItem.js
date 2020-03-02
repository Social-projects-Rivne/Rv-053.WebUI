import React, { useEffect, useState } from 'react';

import Map from '../../shared/components/UI/Map';
import UserCard from '../../shared/components/UI/UserCard';
import './EventItem.css';

const EventItem = props => {
  const [address, setAddres] = useState();
  const coordinates = props.event.location.split(',');
  const map = {
    lat: +coordinates[0],
    lng: +coordinates[1]
  };

  const getAddressFromLatLng = async () => {
    const KEY = 'AIzaSyBm7XQkNxvkDvy1KPfh6R_vxuh2BfsADdE';
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${+coordinates[0]},${+coordinates[1]}&key=${KEY}`;
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let address = data.results[0].formatted_address;
        setAddres(address);
        console.log(address);
      })
      .catch(err => console.warn(err.message));
  };
  useEffect(() => {
    getAddressFromLatLng();
  }, []);

  console.log(map);
  return (
    <div className='container event-item'>
      <div className='row'>
        <div className='col-md-8 event-item__img'>
          <figure>
            <img src={props.event.cover} alt='sometext' />
          </figure>
        </div>
        <div className='col-md-4 event-item__info'>
          <h3>{props.event.name}</h3>
          <div>
            <span>Address: </span>
            {address}
          </div>
          <div>
            <span>Date: </span>
            {props.event.datetime}
          </div>
          <div>
            <span>Time: </span>
            {props.event.duration}
          </div>
          <div>
            <span>Age: </span>
            {props.event.min_age} years
          </div>
          <h6>
            Max participants:
            {props.max_participants > 1
              ? ` ${props.event.max_participants} people`
              : ` ${props.event.max_participants} person`}
          </h6>
          <button
            type='button'
            className='my__button'
            onClick={() => props.joinEvent(props.id)}
            disabled={!props.event.isSubscribe ? false : true}
          >
            {!props.event.isSubscribe ? 'Subcribe' : 'Subcribed'}
          </button>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-8 event-item__desctiption'>
          <div className=''>
            <h3>Details</h3>
            <p>{props.event.description}</p>
          </div>
        </div>
        <div className='col-md-4 event-item__owner'>
          <UserCard owner={props.owner} />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-12 map-container'>
          <Map center={map} zoom={16} />
        </div>
      </div>
    </div>
  );
};

export default EventItem;
