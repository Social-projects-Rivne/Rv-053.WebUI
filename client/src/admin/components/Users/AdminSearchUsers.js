import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AdminSearchUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();

  const handleSubmit = event => {
    event.preventDefault();

    history.push(`?quer=${searchQuery}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='form__search_event'>
        <input
          type='text'
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
          className='header__search'
          placeholder='Search user..'
        />

        <button type='submit' value='' className='header__submit'></button>
      </form>
    </div>
  );
};

export default AdminSearchUsers;
