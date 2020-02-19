import React, { useState } from 'react';

import UserItem from './UserItem';
import Pagination from '../../../shared/components/UI/Pagination';

const UsersList = props => {
  const [users, setUsers] = useState({
    count: 0,
    rows: []
  });

  const getUsers = data => {
    setUsers(data);
  };

  return (
    <Pagination api="/api/adminpanel/users" getData={getUsers} limit={4}>
      <ul className="list-group">
        {users.rows ? users.rows.map(user => <UserItem key={user.id} userInfo={user} />) : null}
      </ul>
    </Pagination>
  );
};

export default UsersList;
