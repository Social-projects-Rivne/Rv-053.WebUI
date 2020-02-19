import React, { useState, useContext } from "react";

import EventResultItem from "./EventResultItem";
import "./EventsResult.css";
import Search from "../components/search";
import { EventContext } from "../../shared/context/events-context";

const EventsResult = () => {
  const eventContext = useContext(EventContext);

  const [toggleListState, setToggleListState] = useState({ list: true });
  const toggleListHandler = () => {
    let isList = toggleListState.list;
    setToggleListState({ list: !isList });
    console.log(window.screen.width);
  };

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
                    ? "list__events-sort_btn-item icon-th-list active"
                    : "list__events-sort_btn-item icon-th-list"
                }
                onClick={toggleListHandler}
              ></button>
              <button
                className={
                  !toggleListState.list
                    ? "list__events-sort_btn-item icon-th-large active"
                    : "list__events-sort_btn-item icon-th-large"
                }
                onClick={toggleListHandler}
              ></button>
            </div>
          </div>
          <div
            className={
              toggleListState.list
                ? "list__events-items"
                : "list__events-items card-wrapper"
            }
          >
            {eventContext.events.map(event => {
              return (
                <EventResultItem
                  key={event.id}
                  className={
                    toggleListState.list
                      ? "list__events-item"
                      : "list__events-item card"
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
