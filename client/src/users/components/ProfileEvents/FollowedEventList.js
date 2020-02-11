import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import EventItem from './EventItem';
import { api_server_url } from '../../../shared/utilities/globalVariables';
import { AuthContext } from '../../../shared/context/auth-context';

const FollowedEventList = () => {
  const accessToken = useContext(AuthContext).token;
  const [events, setEvents] = useState([]);
  const headers = {
    Authorization: 'Bearer ' + accessToken
  };

  const getEvents = async () => {
    const res = await axios.get(api_server_url + '/api/user/sub-event', {
      headers
    });
    setEvents(res.data.data.subEvent);
  };

  useEffect(() => {
    if (accessToken) {
      getEvents();
    }
  }, [accessToken]);

  return (
    <div className="event_list-item">
      <h3 className="profile-title">Followed events</h3>
      {events.length > 0 ? (
        events.map(event => (
          <EventItem
            key={event['event.id']}
            title={event['event.name']}
            date={event['event.datetime']}
          />
        ))
      ) : (
        <p>You haven`t followed any events</p>
      )}
    </div>
  );
};

export default FollowedEventList;
