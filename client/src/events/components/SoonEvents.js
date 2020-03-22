import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import { api_server_url } from './../../shared/utilities/globalVariables';
import MySlider from '../../shared/components/UI/MySlider';
import EventResultItem from './../pages/EventResultItem';
import './SoonEvents.css';

const SoonEvents = () => {
  const [soonEventsState, setSoonEventsState] = useState();
  const getSoonEvents = async () => {
    const soonEvents = (await axios.get(api_server_url + '/api/events')).data.rows.slice(0, 12);
    setSoonEventsState(soonEvents);
  };
  useEffect(() => {
    getSoonEvents();
  }, []);

  return (
    <section className="soon__events">
      <div className="my__container">
        <div className="soon__events-inner">
          <div className="soon__events-title">Coming soon...</div>
          <MySlider slidesToShow="4" slidesToScroll="4" dots={true} >
            {soonEventsState
              ? soonEventsState.map(event => (
                  <EventResultItem
                    key={event.id}
                    className="list__events-item card event_slider-item"
                        id={event.id}
                        name={event.name}
                        category={event.categories[0].category}
                        description={event.description}
                        location={event.location}
                        datetime={event.datetime}
                        cover={event.cover}
                        price={event.price}
                        owner_id={event.owner_id}
                        owner_first_name={event.user.first_name}
                        owner_last_name={event.user.last_name}
                  />
                ))
              : null}
          </MySlider>
          <div className="soon__events-link">
            <NavLink to="/events">All events</NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoonEvents;
