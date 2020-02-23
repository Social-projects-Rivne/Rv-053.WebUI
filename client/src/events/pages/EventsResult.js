import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import EventResultItem from './EventResultItem';
import './EventsResult.css';
import { EventContext } from '../../shared/context/events-context';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';

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
    console.log(window.screen.width);
  };

  const getAllEvents = () => {
    // console.log('AAAAAA');
    axios({
      method: 'get',
      url: `http://localhost:5001/api/events`,
      params: {
        q: searchQuery
      },
      headers: { Authorization: 'Bearer ' + accessToken }
    }).then(response => {
      setAllEvents(response.data.rows);
      console.log(response.data.rows);
    });
  };

  useEffect(() => {
    eventContext.setEvents(allEvents);
  }, [allEvents]);

  useEffect(() => {
    getAllEvents();
  }, [searchQuery]);

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
          <div
            className={
              toggleListState.list ? 'list__events-items' : 'list__events-items card-wrapper'
            }
          >
            {eventContext.events.map(event => {
              return (
                <EventResultItem
                  key={event.id}
                  className={toggleListState.list ? 'list__events-item' : 'list__events-item card'}
                  title={event.name}
                  category={event.category}
                  description={event.description}
                  price={event.price}
                  owner={event.owner}
                  location={event.location}
                  date={event.datetime}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsResult;
