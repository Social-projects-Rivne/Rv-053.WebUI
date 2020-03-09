import React, { useState, useCallback, useContext, useEffect, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

import AdminUserItem from './AdminUserItem';
import Pagination from '../../../shared/components/UI/Pagination';
import { AuthContext } from '../../../shared/context/auth-context';
import { api_server_url } from '../../../shared/utilities/globalVariables';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const AdminUsersList = () => {
  const history = useHistory();
  const urlParams = useQuery();
  const searchQuery = urlParams.get('quer');
  const [users, setUsers] = useState({
    count: 0,
    rows: []
  });
  const [userRoleForAdminpanel, setUserRoleForAdminpanel] = useState(null);
  const accessToken = useContext(AuthContext).token;
  const headers = useMemo(
    () => ({
      Authorization: 'Bearer ' + accessToken
    }),
    [accessToken]
  );

  const getUserRoleForAcces = useCallback(async () => {
    try {
      const res = await axios.get(api_server_url + '/api/adminpanel/getrole', { headers });
      const role = res.data.role;
      console.log(role);
      if (role === 'Admin' || role === 'Moderator') {
        setUserRoleForAdminpanel(role);
      } else {
        history.push('/');
      }
    } catch (e) {
      console.log(e);
      history.push('/');
    }
  }, [headers, history]);

  useEffect(() => {
    getUserRoleForAcces();
  }, [getUserRoleForAcces]);

  const getUsers = useCallback(data => {
    setUsers(data);
  }, []);

  return (
    <>
      <Pagination
        api="/api/adminpanel/users"
        onDataFetch={getUsers}
        pageItemsLimit={5}
        query={'q=' + (searchQuery ? searchQuery : '')}
      >
        <ul className="list-group mb-4">
          {users.rows
            ? users.rows.map(user => (
                <AdminUserItem key={user.id} userInfo={user} accessRole={userRoleForAdminpanel} />
              ))
            : null}
        </ul>
      </Pagination>
    </>
  );
};

export default AdminUsersList;
