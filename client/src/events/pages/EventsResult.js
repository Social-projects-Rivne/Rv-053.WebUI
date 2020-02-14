import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './EventsResult.css';

const EventsResult = () => {
  const [cardState, setCardState] = useState();

  const addActiveClassHandler = () => {
    let elem = document.getElementsByClassName('active');
  };
  return (
    <section className="list__events">
      <div className="container">
        <div className="list__events__inner">
          <div className="list__events-sort">
            <span>Sort by</span>
            <div className="list__events-sort_btn">
              <button
                className="list__events-sort_btn-item icon-th-list active"
                onClick={addActiveClassHandler}
              ></button>
              <button
                className="list__events-sort_btn-item icon-th-large"
                onClick={addActiveClassHandler}
              ></button>
            </div>
          </div>
          <div className="list__events-items">
            <div className="list__events-item">
              <div className="list__events-item-img">
                <img src="" alt="" />
              </div>
              <div className="list__events-item-info">
                <div className="list__events-item-top_info">
                  <div className="list__events-item-description">
                    <div className="list__events-item-title">Sport competition</div>
                    <div className="list__events-item-category">Sport</div>
                    <div className="list__events-item-descr">
                      lorem ipsum lorem ipsum lorem ipsum...
                    </div>
                  </div>
                  <div className="list__events-item-price">$100</div>
                </div>
                <div className="list__events-item-bottom_info">
                  <div className="list__events-item-creator">Oleksandr</div>
                  <div className="list__events-item-location">Rivne, Korolenka 2</div>
                  <div className="list__events-item-date">25.02.20</div>
                  <NavLink to="/" className="list__events-item-join">
                    Join
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsResult;
