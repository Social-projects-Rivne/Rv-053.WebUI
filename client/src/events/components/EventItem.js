import React from 'react';

import Map from '../../shared/components/UI/Map';
import UserCard from '../../shared/components/UI/UserCard';
import './EventItem.css';

const EventItem = props => {
  return (
    <div className="container event-item">
      <div className="row">
        <div className="col-md-8 event-item__img">
          <figure>
            <img src={props.event.cover} alt="sometext" />
          </figure>
        </div>
        <div className="col-md-4 event-item__info">
          <h3>{props.event.name}</h3>
          <div>
            <span>Address: </span>
            {props.event.location}
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
          <button type="button" className="btn btn-dark">
            Join
          </button>
        </div>
      </div>
      <div className="row">
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

      <div className="row">
        <div className="col-md-12 map-container">
          <Map center={props.event.location} zoom={16} />
        </div>
      </div>
    </div>
  );
};

export default EventItem;
