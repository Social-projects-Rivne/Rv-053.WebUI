import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import EventResultItem from './EventResultItem';
import './EventsResult.css';
import { EventContext } from '../../shared/context/events-context';
import { useLocation } from 'react-router-dom';
import Filter from '../../shared/components/Filter/Filter';
import { CategoryContext } from '../../shared/components/Filter/Category/CategoryContext';
import { DateRangesContext } from '../../shared/components/Filter/DateRange/DateRangesContext';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EventsResult = () => {
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
  const { selectedCategory } = useContext(CategoryContext);
  const { endtDate, startDate } = useContext(DateRangesContext);
  console.log('RESALT');
  console.log(endtDate);
  console.log(startDate);
  console.log(selectedCategory);
  const getAllEvents = () => {
    console.log('AAAAAA');
    axios({
      method: 'get',
      url: `http://localhost:5001/api/events`,
      params: {
        q: searchQuery
      }
    }).then(response => {
      setAllEvents(response.data.rows);
      console.log(response.data.rows);
    });
  };

  const annotaite = () => {
    console.log('Change');
  };

  // const getFilteredEvents = () => {
  //   const fetchEvents = async () => {
  //     const result = await axios.get(
  //       `api/events/filter?startDate=${startDate}&endDate=${endtDate}&category=1&limit=10&offset=0`
  //     );
  //     eventContext.setEvents(result.data);
  //   };
  //   fetchEvents();
  // };

  // useEffect(() => {
  //   getFilteredEvents();
  // }, []);

  useEffect(() => {
    eventContext.setEvents(allEvents);
  }, [allEvents]);

  useEffect(() => {
    getAllEvents();
  }, [searchQuery]);

  return (
    <section className='list__events'>
      <div className='my__container'>
        <div className='list__events__inner'>
          <div className='text-center'>
            {`Selected time from ${moment(startDate).format(
              'MMMM Do YYYY, h:mm a'
            )} to ${moment(endtDate).format('MMMM Do YYYY, h:mm a')}`}
          </div>
          <div className='list__events-sort'>
            <span>
              <Filter />
            </span>
            <div className='list__events-sort_btn'>
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
              toggleListState.list
                ? 'list__events-items'
                : 'list__events-items card-wrapper'
            }
          >
            {eventContext.events.map(event => {
              return (
                <EventResultItem
                  key={event.id}
                  className={
                    toggleListState.list
                      ? 'list__events-item'
                      : 'list__events-item card'
                  }
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
