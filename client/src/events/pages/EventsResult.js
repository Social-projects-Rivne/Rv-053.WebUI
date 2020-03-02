import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import EventResultItem from './EventResultItem';
import Pagination from '../../shared/components/UI/Pagination';
import ScrollToTop from '../../shared/components/UI/ScrollToTop';
import './EventsResult.css';
import Filter from '../../shared/components/Filter/Filter';
import DateRangeContextProvider from '../../shared/components/Filter/DateRange/DateRangesContext';
import CategoryContextProvider from '../../shared/components/Filter/Category/CategoryContext';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EventsResult = () => {
  const urlParams = useQuery();

  const searchQuery = urlParams.get('query');
  const filterCategory = urlParams.get('category');
  const filterStartDate = urlParams.get('startDate');
  const filterEndDate = urlParams.get('endDate');
  const apiFilterQuery = `startDate=${filterStartDate}&endDate=${filterEndDate}&category=${filterCategory}`;

  const [allEvents, setAllEvents] = useState([]);
  const [toggleListState, setToggleListState] = useState({ list: true });
  const toggleListHandler = () => {
    let isList = toggleListState.list;
    setToggleListState({ list: !isList });
  };

  const getEvents = useCallback(data => {
    setAllEvents(data.rows);
  }, []);
  console.log(allEvents);
  return (
    <CategoryContextProvider>
      <DateRangeContextProvider>
        <section className="list__events">
          <div className="my__container">
            <div className="list__events__inner">
              <div className="list__events-sort">
                <Filter className="" />
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
                api={
                  filterCategory || filterStartDate || filterEndDate
                    ? '/api/events/filter'
                    : '/api/events/'
                }
                onDataFetch={getEvents}
                pageItemsLimit={4}
                query={
                  filterCategory || filterStartDate || filterEndDate
                    ? apiFilterQuery
                    : `q=${searchQuery ? searchQuery : ''}`
                }
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
                          category={event.categories[0].category}
                          description={event.description}
                          price={event.price}
                          owner={event.owner}
                          location={event.location}
                          date={event.datetime}
                          user={event.user}
                        />
                      );
                    })
                  ) : (
                    <p className="text-center">Doesn't find anything</p>
                  )}
                </div>
              </Pagination>
            </div>
            <ScrollToTop />
          </div>
        </section>
      </DateRangeContextProvider>
    </CategoryContextProvider>
  );
};

export default EventsResult;
