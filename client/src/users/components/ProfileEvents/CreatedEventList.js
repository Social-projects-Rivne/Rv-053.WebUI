import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import { api_server_url } from '../../../shared/utilities/globalVariables';
import { AuthContext } from '../../../shared/context/auth-context';
import EventItemCreated from './EventItemCreated';

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

  const deleteEvent = async id => {
    await axios
      .delete(api_server_url + `/api/events/${id}`, {
        headers
      })
      .then(() => {
        const Events = [...events];
        Events.splice(
          Events.findIndex(item => item['event.id'] === id),
          1
        );
        setEvents(Events);
      });
  };

  useEffect(() => {
    if (accessToken) {
      getEvents();
    }
  }, [accessToken]);

  return (
    <div className='event_list-item'>
      <h3 className='profile-title'>Created events</h3>
      {events.length > 0 ? (
        events.map(event => (
          <EventItemCreated
            key={event['id']}
            id={event['id']}
            title={event['name']}
            date={event['datetime']}
            deleteEvent={deleteEvent}
          />
        ))
      ) : (
        <p>You haven`t created any events</p>
      )}
    </div>
  );
};

export default CreatedEventList;
