import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import moment from 'moment';

import ConfirmationWindow from '../../shared/components/UI/ConfirmationWindow';
import { returnAddress } from '../../shared/components/UI/Geocoding';
import './EventsResult.css';

const EventResultItem = props => {
  const userId = useParams().userId;
  const [address, setAddress] = useState();
  const [confirmUnfollowFlag, setConfirmUnfollowFlag] = useState(false);
  const [confirmDeleteFlag, setConfirmDeleteFlag] = useState(false);
  const image = {
    backgroundImage: `url(${props.cover})`
  };
  const datetime = moment(+props.datetime)
    .format('DD MM YYYY')
    .split(' ')
    .join('.');

  // const [lat, lon] = props.location.split(',');

  // useEffect(() => {
  //   const geocodeObj = returnAddress(lat, lon);
  //   geocodeObj.then(geocodeObj => {
  //     const geoComponent = geocodeObj.address_components;
  //     setAddress(
  //       `${geoComponent[2].long_name}, ${geoComponent[1].long_name} ${geoComponent[0].long_name}`
  //     );
  //   });
  // }, [lat, lon]);

  const confirmUnfollow = () => {
    setConfirmUnfollowFlag(true);
  };
  const confirmDelete = () => {
    setConfirmDeleteFlag(true);
  };
  return (
    <>
      {confirmUnfollowFlag ? (
        <ConfirmationWindow
          message={`Do you want to leave ${props.name} ?`}
          onYes={() => props.unfollowFromEvent(props.id)}
          onNo={() => setConfirmUnfollowFlag(false)}
        />
      ) : null}
      {confirmDeleteFlag ? (
        <ConfirmationWindow
          message={`Do you want to delete ${props.name} ?`}
          onYes={props.deleteEvent}
          onNo={() => setConfirmDeleteFlag(false)}
        />
      ) : null}
      <div className={props.className}>
        <NavLink
          to={'/event/' + props.id}
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
            <div className="list__events-item-location">{address}</div>
            <div className="list__events-item-date">{datetime}</div>
          </div>
          {props.unfollowFromEvent ? (
            <div className="list__events-item-panel">
              <button className="button-link icon-ban" onClick={confirmUnfollow}></button>
            </div>
          ) : null}
          {userId === 'my' && props.deleteEvent ? (
            <>
              <div className="list__events-item-panel">
                <NavLink
                  className="button-link icon-pencil link"
                  to={`/editevent/${props.id}`}
                ></NavLink>
                <button className="button-link icon-trash" onClick={confirmDelete}></button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default EventResultItem;
