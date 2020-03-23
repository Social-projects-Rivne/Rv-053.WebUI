import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';

import MySlider from '../../../shared/components/UI/MySlider';
import EventResultItem from './../../../events/pages/EventResultItem';
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
            <NavLink to="/pastevents" className="icon-inbox button-link"></NavLink>
          </div>
          <MySlider slidesToShow={events.length === 1 ? 1 : 3 & events.length === 2 ? 2 : 3} dots={true}>
          {events.length > 0 ? (
            events.map(event => (
              <EventResultItem
                key={event.event.id}
                className="list__events-item card event_slider-item profile"
                id={event.event.id}
                name={event.event.name}
                category={event.event.categories[0].category}
                description={event.event.description}
                location={event.event.location}
                datetime={event.event.datetime}
                cover={event.event.cover}
                price={event.event.price}
                unfollowFromEvent={()=>unfollowFromEvent(event.event.id)}
            />
            ))
          ) : (
            <p>You haven`t followed any events</p>
          )}
          </MySlider>
        </div>
      ) : null}
    </>
  );
};

export default FollowedEventList;
