import React, { useState, useContext, useEffect } from 'react';
import './search.css';
import EventInList from '../components/EventInList';
import axios from 'axios';
import EventsList from '../pages/EventsList';
import { EventContext } from '../../shared/context/events-context';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedArr, setSearchedArr] = useState([]);
  const eventContext = useContext(EventContext);

  const handleSubmit = event => {
    event.preventDefault();

    axios
      .get(`http://localhost:5001/api/events?q=${searchQuery}&limit=10&offset=0`)
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
      <form onSubmit={handleSubmit} className="search">
        <input
          type="text"
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
          className="inputSearch"
        />

        <input type="submit" value="" className="submit" />
      </form>
      <div className="d-flex flex-wrap justify-content-around"></div>
    </div>
  );
};

export default Search;
