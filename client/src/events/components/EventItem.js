import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Map from '../../shared/components/UI/Map';
import UserCard from '../../shared/components/UI/UserCard';
import EventGallery from './EventGallery';
import { returnAddress } from '../../shared/components/UI/Geocoding';
import './EventItem.css';
import Countdown from '../../shared/components/UI/CountDownTimer';
import { api_server_url } from '../../shared/utilities/globalVariables';

const EventItem = props => {
  const history = useHistory();
  const [address, setAddress] = useState();
  const coordinates = props.event.location.split(',');
  const map = {
    lat: +coordinates[0],
    lng: +coordinates[1]
  };

  useEffect(() => {
    const geocodeObj = returnAddress(+coordinates[0], +coordinates[1]);
    geocodeObj.then(geocodeObj => {
      setAddress(geocodeObj.formatted_address);
    });
  }, [coordinates]);

  return (
    <div className="container event-item">
      <div className="row">
        <div className="col-md-8 event-item__img">
          <figure>
            <img src={`${props.event.cover}`} alt="sometext" />
          </figure>
          <Countdown
            timeTillDate={props.event.datetime}
            className="countdown-item"
          />
        </div>
        <div className="col-md-4 event-item__info">
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
          <div>
            <span>Participants: </span>
            {props.quantity} /
            {props.max_participants > 1
              ? ` ${props.event.max_participants} people`
              : ` ${props.event.max_participants} person`}
            {props.accessToken ? (
              <button
                type="button"
                className="my__button"
                onClick={() => props.joinEvent(props.id)}
                disabled={!props.event.isSubscribe ? false : true}
              >
                {!props.event.isSubscribe ? 'Subcribe' : 'Subcribed'}
              </button>
            ) : (
              <button
                type="button"
                className="my__button"
                onClick={() => history.push('/auth')}
              >
                Subcribe
              </button>
            )}
          </div>
        </div>
        <div className="row row__description">
          <div className="col-md-8 event-item__desctiption">
            <div className="">
              <h3>Details</h3>
              <p>{props.event.description}</p>
            </div>
          </div>
          <div className="col-md-4 event-item__owner">
            <UserCard owner={props.owner} />
          </div>
        </div>

        <div className="row" style={{ width: '100%' }}>
          <div className="col-md-12 map-container">
            <Map center={map} zoom={16} />
          </div>
        </div>
      </div>
      <div className="event-item__gallery">
        <EventGallery />{' '}
      </div>
    </div>
  );
};

export default EventItem;
