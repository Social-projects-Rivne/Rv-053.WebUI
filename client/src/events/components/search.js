import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './search.css';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();

  const handleSubmit = event => {
    event.preventDefault();

    history.push(`/events?query=${searchQuery}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form__search_event">
        <input
          type="text"
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
          className="header__search"
          placeholder="Search event.."
        />

        <button type="submit" value="" className="header__submit"></button>
      </form>
    </div>
  );
};

export default Search;
