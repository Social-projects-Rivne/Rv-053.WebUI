import React, { useState, useCallback } from 'react';

import Pagination from '../../../shared/components/UI/Pagination';
import AdminEventItem from './AdminEventItem';
import './AdminEventItem.css';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EventsList = props => {
  const urlParams = useQuery();
  const searchQuery = urlParams.get('q');
  const [events, setEvents] = useState({
    count: 0,
    rows: []
  });

  const getEvents = useCallback(data => {
    setEvents(data);
  }, []);
  console.log(searchQuery);
  return (
    <>
      <Pagination
        api='/api/adminpanel/events'
        onDataFetch={getEvents}
        pageItemsLimit={10}
        query={'q=' + (searchQuery ? searchQuery : '')}
      >
        <ul className='list-group mb-4'>
          {events.rows
            ? events.rows.map(event => (
                <AdminEventItem key={event.id} eventInfo={event} />
              ))
            : null}
        </ul>
      </Pagination>
    </>
  );
};

export default EventsList;
