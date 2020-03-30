import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

const AdminSearchEvents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();

  const handleSubmit = event => {
    event.preventDefault();

    history.push(`?q=${searchQuery}`);
  };
  const inputHandler = useCallback((id, value, isValid) => {
    setSearchQuery(value);
  }, []);

  return (
    <div className="mb-1">
      <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
        <div style={{ width: '90%', display: 'inline-block', marginTop: '-1rem' }}>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
          className="adminpanel__input mt-4 w-100"
          placeholder="Search event"
        />
        <label className="adminpanel__label" for="search">
        Search event
        </label>
        </div>

        <button type="submit" value="" className="adminpanel__search-btn"></button>
      </form>
    </div>
  );
};

export default AdminSearchEvents;
