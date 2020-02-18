import React from 'react';

import Events from '../components/Events/Event';
import Logs from '../components/Logs/Logs';
import Card from '../../shared/components/UI/Card';
import UsersList from '../components/Users/UsersList';

const AdminPanelPage = () => {
  return (
    <>
      <Card>
        <UsersList />
      </Card>
      <Card>
        <Events />
      </Card>
      <Card>
        <Logs />
      </Card>
    </>
  );
};

export default AdminPanelPage;
