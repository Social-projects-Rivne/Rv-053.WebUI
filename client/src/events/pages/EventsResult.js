import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import EventResultItem from './EventResultItem';
import Pagination from '../../shared/components/UI/Pagination';
import ScrollToTop from '../../shared/components/UI/ScrollToTop';
import { EventContext } from '../../shared/context/events-context';
import { AuthContext } from '../../shared/context/auth-context';
import './EventsResult.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EventsResult = () => {
  const accessToken = useContext(AuthContext).token;

  const urlParams = useQuery();
  const eventContext = useContext(EventContext);

  const searchQuery = urlParams.get('query');

  const [allEvents, setAllEvents] = useState([]);
  const [toggleListState, setToggleListState] = useState({ list: true });
  const toggleListHandler = () => {
    let isList = toggleListState.list;
    setToggleListState({ list: !isList });
  };

  useEffect(() => {
    eventContext.setEvents(allEvents);
  }, [allEvents]);

  const getEvents = useCallback(data => {
    setAllEvents(data.rows);
  }, []);
  console.log(allEvents);
  return (
    <section className="list__events">
      <div className="my__container">
        <div className="list__events__inner">
          <div className="list__events-sort">
            <span>Sort by</span>
            <div className="list__events-sort_btn">
              <button
                className={
                  toggleListState.list
                    ? 'list__events-sort_btn-item icon-th-list active'
                    : 'list__events-sort_btn-item icon-th-list'
                }
                onClick={toggleListHandler}
              ></button>
              <button
                className={
                  !toggleListState.list
                    ? 'list__events-sort_btn-item icon-th-large active'
                    : 'list__events-sort_btn-item icon-th-large'
                }
                onClick={toggleListHandler}
              ></button>
            </div>
          </div>
          <Pagination
            api="/api/events/"
            onDataFetch={getEvents}
            pageItemsLimit={4}
            query={'q=' + (searchQuery ? searchQuery : '')}
          >
            <div
              className={
                toggleListState.list ? 'list__events-items' : 'list__events-items card-wrapper'
              }
            >
              {allEvents[0] ? (
                allEvents.map(event => {
                  return (
                    <EventResultItem
                      key={event.id}
                      cover={event.cover}
                      className={
                        toggleListState.list ? 'list__events-item' : 'list__events-item card'
                      }
                      id={event.id}
                      title={event.name}
                      category={event.category}
                      description={event.description}
                      price={event.price}
                      owner={event.owner}
                      location={event.location}
                      date={event.datetime}
                      // user={event}
                    />
                  );
                })
              ) : (
                <p className="text-center">Doesn't find anything</p>
              )}
            </div>
          </Pagination>
        </div>
      </div>
      <ScrollToTop />
    </section>
  );
};

export default EventsResult;
