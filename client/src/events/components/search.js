import React, { useState, useContext, useEffect } from "react";
import "./search.css";
import EventInList from "../components/EventInList";
import axios from "axios";
import EventsList from "../pages/EventsList";
import { EventContext } from "../../shared/context/events-context";
import { NavLink } from "react-router-dom";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedArr, setSearchedArr] = useState([]);
  const eventContext = useContext(EventContext);

  const handleSubmit = event => {
    event.preventDefault("");

    axios
      .get(
        `http://localhost:5001/api/events?q=${searchQuery}&limit=10&offset=0`
      )
      .then(response => {
        setSearchedArr(response.data.rows);
      });
    console.log(searchedArr);
  };

  useEffect(() => {
    eventContext.setEvents(searchedArr);
  }, [searchedArr]);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        onClick={handleSubmit}
        className="form__search_event"
      >
        <NavLink to="/events">
          <input
            type="text"
            value={searchQuery}
            onChange={event => setSearchQuery(event.target.value)}
            className="header__search"
            placeholder="Search event.."
          />
        </NavLink>
        <button type="submit" value="" className="header__submit"></button>
      </form>
    </div>
  );
};

export default Search;
