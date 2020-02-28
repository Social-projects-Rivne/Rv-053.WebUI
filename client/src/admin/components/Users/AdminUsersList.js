import React, { useState, useCallback } from 'react';

import AdminUserItem from './AdminUserItem';
import Pagination from '../../../shared/components/UI/Pagination';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const AdminUsersList = () => {
  const urlParams = useQuery();
  const searchQuery = urlParams.get('quer');
  const [users, setUsers] = useState({
    count: 0,
    rows: []
  });

  const getUsers = useCallback(data => {
    setUsers(data);
  }, []);

  return (
    <>
      <Pagination
        api='/api/adminpanel/users'
        onDataFetch={getUsers}
        pageItemsLimit={5}
        query={'q=' + (searchQuery ? searchQuery : '')}
      >
        <ul className='list-group mb-4'>
          {users.rows
            ? users.rows.map(user => (
                <AdminUserItem key={user.id} userInfo={user} />
              ))
            : null}
        </ul>
      </Pagination>
    </>
  );
};

export default AdminUsersList;
