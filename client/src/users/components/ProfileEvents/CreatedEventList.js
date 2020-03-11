import React, { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { api_server_url } from '../../../shared/utilities/globalVariables';
import { AuthContext } from '../../../shared/context/auth-context';
import EventResultItem from './../../../events/pages/EventResultItem'; 
import EventItemCreated from './EventItemCreated';

const CreatedEventList = () => {
  const accessToken = useContext(AuthContext).token;
  const [events, setEvents] = useState([]);
  const userId = useParams().userId;
  const headers = useMemo(
    () => ({
      Authorization: 'Bearer ' + accessToken
    }),
    [accessToken]
  );

  const getEvents = useCallback(async () => {
    if (userId === 'my') {
      const res = await axios.get(api_server_url + '/api/user/events', {
        headers
      });
      setEvents(res.data.data.event);
    } else {
      const res = await axios.get(`${api_server_url}/api/user/${userId}`, {
        headers
      });
      setEvents(res.data.data.events);
    }
  }, [userId, headers]);

  const deleteEvent = async id => {
    await axios
      .delete(api_server_url + `/api/events/${id}`, {
        headers
      })
      .then(() => {
        const Events = [...events];
        Events.splice(
          Events.findIndex(item => item['id'] === id),
          1
        );
        setEvents(Events);
      });
  };

  useEffect(() => {
    if (accessToken) {
      getEvents();
    }
  }, [accessToken, getEvents]);

  return (
    <div className="event_list-item">
      <h3 className="profile-title">Created events</h3>
      {console.log(events)}
      {events.length > 0 ? (
        events.map(event => (
          <EventResultItem
            key={event.id}
            className="list__events-item card event_slider-item"
            id={event.id}
            name={event.name}
            // category={event.categories[0].category}
            description={event.description}
            location={event.location}
            datetime={event.datetime}
            cover={event.cover}
            price={event.price}
            deleteEvent={deleteEvent}
         /> 
        ))
      ) : (
        <p>{userId === 'my' ? "You haven't" : "User hasn't"} created any events</p>
      )}
    </div>
  );
};

export default CreatedEventList;
