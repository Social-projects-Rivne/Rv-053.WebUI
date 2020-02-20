import React, { useState, useContext, useEffect } from 'react';
import './search.css';

import { EventContext } from '../../shared/context/events-context';
import { useHistory } from 'react-router-dom';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedArr, setSearchedArr] = useState([]);
  const eventContext = useContext(EventContext);
  const history = useHistory();

  const handleSubmit = event => {
    event.preventDefault();

    history.push(`/events?query=${searchQuery}`);
  };

  useEffect(() => {
    eventContext.setEvents(searchedArr);
  }, [searchedArr]);

  return (
    <div>
      <form onSubmit={handleSubmit} className='form__search_event'>
        <input
          type='text'
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
          className='header__search'
          placeholder='Search event..'
        />

        <button type='submit' value='' className='header__submit'></button>
      </form>
    </div>
  );
};

export default Search;
