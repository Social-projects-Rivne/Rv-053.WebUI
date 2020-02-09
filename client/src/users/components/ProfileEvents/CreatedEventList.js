import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import EventItem from './EventItem';
import { api_server_url } from '../../../shared/utilities/globalVariables';
import { AuthContext } from '../../../shared/context/auth-context';

const CreatedEventList = () => {
  const accessToken = useContext(AuthContext).token;
  const [events, setEvents] = useState([]);
  const headers = {
    Authorization: 'Bearer ' + accessToken
  };

  const getEvents = async () => {
    const res = await axios.get(api_server_url + '/api/user/events', {
      headers
    });
    setEvents(res.data.data.event);
  };

  useEffect(() => {
    if (accessToken) {
      getEvents();
    }
  }, [accessToken]);

  return (
    <div className="event_list-item">
      <h3 className="profile-title">Your created events</h3>
      {events.length > 0 ? (
        events.map(event => <EventItem key={event.id} title={event.name} date={event.datetime} />)
      ) : (
        <p>You have not create any event.</p>
      )}
    </div>
  );
};

export default CreatedEventList;
