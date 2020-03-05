import React, { useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import EventItemFollowed from './EventItemFollowed';
import { api_server_url } from '../../../shared/utilities/globalVariables';
import { AuthContext } from '../../../shared/context/auth-context';

const FollowedEventList = () => {
  const accessToken = useContext(AuthContext).token;
  const [events, setEvents] = useState([]);
  const headers = {
    Authorization: 'Bearer ' + accessToken
  };

  const getEvents = useCallback(async () => {
    const res = await axios.get(api_server_url + '/api/user/followed-events', {
      headers
    });
    setEvents(res.data.data.followedEvent);
  }, [headers]);

  const unfollowFromEvent = async id => {
    await axios
      .delete(api_server_url + `/api/user/unfollow-event/${id}`, {
        headers
      })
      .then(() => {
        const newEvents = [...events];
        newEvents.splice(
          newEvents.findIndex(item => item['event.id'] === id),
          1
        );
        setEvents(newEvents);
      });
  };

  useEffect(() => {
    if (accessToken) {
      getEvents();
    }
  }, [accessToken, getEvents]);

  return (
    <div className="event_list-item">
      <h3 className="profile-title">Followed events</h3>
      {events.length > 0 ? (
        events.map(event => (
          <EventItemFollowed
            key={event['event.id']}
            id={event['event.id']}
            title={event['event.name']}
            date={event['event.datetime']}
            unfollowFromEvent={unfollowFromEvent}
          />
        ))
      ) : (
        <p>You haven`t followed any events</p>
      )}
    </div>
  );
};

export default FollowedEventList;
