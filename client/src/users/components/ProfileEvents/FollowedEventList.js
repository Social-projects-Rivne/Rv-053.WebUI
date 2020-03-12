import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';

import EventItemFollowed from './EventItemFollowed';
import { api_server_url } from '../../../shared/utilities/globalVariables';
import { AuthContext } from '../../../shared/context/auth-context';

const FollowedEventList = () => {
  const accessToken = useContext(AuthContext).token;
  const userId = useParams().userId;
  const [events, setEvents] = useState([]);
  const headers = useMemo(
    () => ({
      Authorization: 'Bearer ' + accessToken
    }),
    [accessToken]
  );

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
    <>
      {userId === 'my' ? (
        <div className="event_list-item">
          <div className="profile-title">
            <span>Followed events</span>
            <NavLink to="/pastevents" className="icon-shopping-bag link"></NavLink>
          </div>
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
      ) : null}
    </>
  );
};

export default FollowedEventList;
