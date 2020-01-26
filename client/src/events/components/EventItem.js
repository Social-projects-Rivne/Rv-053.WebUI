import React from "react";
import Map from "../../shared/components/UI/Map";

import "./EventItem.css";
import UserCard from "../../shared/components/UI/UserCard";

const EventItem = props => {
  const [main, ...defaultImages] = props.image;
  console.log(defaultImages);
  return (
    <div className="container event-item">
      <div className="row">
        <div className="col-md-8 event-item__img">
          <figure>
            <img src={main} alt="sometext" />
          </figure>
        </div>
        <div className="col-md-4 event-item__info">
          <h3>{props.title}</h3>
          <div>
            <span>Address: </span>
            {props.address}
          </div>
          <div>
            <span>Date: </span>
            {props.datetime}
          </div>
          <div>
            <span>Time: </span>
            {props.duration}
          </div>
          <div>
            <span>Age: </span>
            {props.min_age} years
          </div>
          <h6>
            Max participants:
            {props.max_participants > 1
              ? ` ${props.max_participants} people`
              : ` ${props.max_participants} person`}
          </h6>
          <button type="button" class="btn btn-dark">
            Join
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 event-item__desctiption">
          <div className="">
            <h3>Details</h3>
            <p>{props.description}</p>
          </div>
        </div>
        <div className="col-md-4 event-item__owner">
          <UserCard />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </div>
    </div>
  );
};

export default EventItem;
