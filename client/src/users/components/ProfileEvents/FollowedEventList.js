import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import EventResultItem from './../../../events/pages/EventResultItem';
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
          <h3 className="profile-title">Followed events</h3>
          {events.length > 0 ? (
            events.map(event => (
              <EventResultItem
                key={event['event.id']}
                className="list__events-item card event_slider-item"
                id={event['event.id']}
                name={event['event.name']}
                // category={event.categories[0].category}
                description={event['event.description']}
                location={event['event.location']}
                datetime={event['event.datetime']}
                cover={event['event.cover']}
                price={event['event.price']}
                unfollowFromEvent={()=>unfollowFromEvent(event['event.id'])}
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
