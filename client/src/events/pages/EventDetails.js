import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import { api_server_url } from '../../shared/utilities/globalVariables';
import { AuthContext } from './../../shared/context/auth-context';
import EventItem from '../components/EventItem';
import './EventDetails.css';

const EventDetails = () => {
  const eventId = useParams().eventId;
  const accessToken = useContext(AuthContext).token;
  const [eventData, setEventData] = useState();
  const headers = {
    Authorization: 'Bearer ' + accessToken
  };
  const getEvent = async () => {
    const event = await axios.get(
      'http://localhost:5001/api/events/' + eventId,
      { headers }
    );
    event.data.datetime = moment(+event.data.datetime)
      .format('DD MM YYYY')
      .split(' ')
      .join('.');
    event.data.duration = moment(+event.data.duration)
      .format('hh mm')
      .replace(' ', ':');
    setEventData(event.data);
  };

  const joinEvent = async id => {
    await axios
      .post(
        api_server_url + `/api/user/follow-event/${id}`,
        {},
        {
          headers
        }
      )
      .then(() => {
        getEvent();
      });
  };

  useEffect(() => {
    getEvent();
  }, []);
  return (
    <div>
      {eventData ? (
        <EventItem
          id={eventData.id}
          event={eventData}
          owner={eventData.user}
          joinEvent={joinEvent}
        />
      ) : (
        <p>Oops, nothing is found...</p>
      )}
    </div>
  );
};

export default EventDetails;
