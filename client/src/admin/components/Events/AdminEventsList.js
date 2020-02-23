import React, { useState, useCallback } from 'react';

import Pagination from '../../../shared/components/UI/Pagination';
import AdminEventItem from './AdminEventItem';
import './AdminEventItem.css';

const EventsList = props => {
  const [events, setEvents] = useState({
    count: 0,
    rows: []
  });

  const getEvents = useCallback(data => {
    setEvents(data);
  }, []);

  return (
    <>
      <Pagination api="/api/adminpanel/events" onDataFetch={getEvents} pageItemsLimit={10}>
        <ul className="list-group mb-4">
          {events.rows
            ? events.rows.map(event => <AdminEventItem key={event.id} eventInfo={event} />)
            : null}
        </ul>
      </Pagination>
    </>
  );
};

export default EventsList;