import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../../shared/components/FormElements/Input';

const AdminSearchUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();

  const handleSubmit = event => {
    event.preventDefault();

    history.push(`?quer=${searchQuery}`);
  };

  const inputHandler = useCallback((id, value, isValid) => {
    setSearchQuery(value);
  }, []);

  return (
    <div className="mb-1">
      <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
        <div style={{ width: '90%', display: 'inline-block', marginTop: '-1rem' }}>
          <Input
            id="searchuser"
            type="input"
            label="Search user"
            onInput={inputHandler}
            validations={[]}
          />
        </div>

        <button type="submit" value="" className="adminpanel__search-btn"></button>
      </form>
    </div>
  );
};

export default AdminSearchUsers;
