import React, { useState, useCallback } from 'react';

import Pagination from '../../../shared/components/UI/Pagination';
import AdminEventItem from './AdminEventItem';
import AdminSearchEvents from './AdminSearchEvents';
import { useLocation } from 'react-router-dom';
import './AdminEventItem.css';

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
  const showItems = props.collapse ? 2 : events.count;

  const getEvents = useCallback(data => {
    setEvents(data);
  }, []);
  return (
    <>
      <AdminSearchEvents />

      <Pagination
        api="/api/adminpanel/events"
        onDataFetch={getEvents}
        pageItemsLimit={showItems < 10 ? showItems : 10}
        query={'q=' + (searchQuery ? searchQuery : '')}
      >
        <ul className="list-group mb-4">
          {events.rows
            ? events.rows
                .slice(0, showItems)
                .map(event => (
                  <AdminEventItem key={event.id} eventInfo={event} collapseState={props.collapse} />
                ))
            : null}
        </ul>
      </Pagination>
    </>
  );
};

export default EventsList;
