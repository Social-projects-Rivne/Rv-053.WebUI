import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import { api_server_url } from '../../shared/utilities/globalVariables';
import { AuthContext } from './../../shared/context/auth-context';
import Notificator from './../../shared/components/UI/Notificator';
import EventItem from '../components/EventItem';
import ScrollToTop from '../../shared/components/UI/ScrollToTop';
import './EventDetails.css';

const EventDetails = () => {
  const eventId = useParams().eventId;
  const accessToken = useContext(AuthContext).token;
  const [showNoteState, setShowNoteState] = useState(false);
  const [eventData, setEventData] = useState();
  const [joinEventFlag, setJoinEventFlag] = useState(false);
  const [quantityParticipants, setQuantityParticipants] = useState();
  const headers = useMemo(
    () => ({
      Authorization: 'Bearer ' + accessToken
    }),
    [accessToken]
  );

  const getEvent = useCallback(async () => {
    const event = await axios.get('http://localhost:5001/api/events/' + eventId, { headers });
    event.data.datetime = moment(+event.data.datetime)
      .format('DD MM YYYY')
      .split(' ')
      .join('.');
    event.data.duration = moment(+event.data.duration)
      .format('hh mm')
      .replace(' ', ':');
    setEventData(event.data);
  }, [eventId, headers]);

  const joinEvent = useCallback(
    async id => {
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
          setShowNoteState(true);
          setJoinEventFlag(true);
        });
    },
    [headers, getEvent]
  );
  const getQuantityParticipants = async id => {
    await axios.get(api_server_url + `/api/events/${id}/count`).then(quantity => {
      setQuantityParticipants(quantity.data.quantityUsers);
    });
  };
  useEffect(() => {
    getEvent();
    getQuantityParticipants(eventId);
  }, [getEvent, eventId]);

  useEffect(() => {
    getQuantityParticipants(eventId);
  }, [joinEventFlag, eventId]);

  const closeNoteHandler = () => {
    setShowNoteState(false);
  };

  return (
    <div>
      <ScrollToTop />
      <Notificator
        className="success-note"
        message="You are successfully subscribed!"
        show={showNoteState}
        onExit={closeNoteHandler}
      />
      {eventData ? (
        <EventItem
          id={eventData.id}
          event={eventData}
          owner={eventData.user}
          joinEvent={joinEvent}
          accessToken={accessToken ? true : false}
          quantity={quantityParticipants}
        />
      ) : (
        <p>Oops, nothing is found...</p>
      )}
    </div>
  );
};

export default EventDetails;
