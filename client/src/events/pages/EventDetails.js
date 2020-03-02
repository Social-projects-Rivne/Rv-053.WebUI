import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import { AuthContext } from './../../shared/context/auth-context';
import EventItem from '../components/EventItem';
import './EventDetails.css';

const EventDetails = () => {
  const eventId = useParams().eventId;
  const accessToken = useContext(AuthContext).token;
  const [eventData, setEventData] = useState();
  const getEvent = async () => {
    const event = await axios.get('http://localhost:5001/api/events/' + eventId);
    event.data.datetime = moment(+event.data.datetime)
      .format('DD MM YYYY')
      .split(' ')
      .join('.');
    event.data.duration = moment(+event.data.duration)
      .format('hh mm')
      .replace(' ', ':');

    setEventData(event.data);
    console.log(event.data);
  };

  useEffect(() => {
    getEvent();
  }, []);
  return (
    <div>
      {eventData ? (
        <EventItem event={eventData} owner={eventData.user} />
      ) : (
        <p>Oops, nothing is found...</p>
      )}
    </div>
  );
};

export default EventDetails;
