import React from 'react';

import Card from '../../shared/components/UI/Card';
import UsersList from '../components/Users/AdminUsersList';
import EventsList from '../components/Events/AdminEventsList';
import Logs from '../components/Logs/Logs';

const AdminPanelPage = () => {
  return (
    <>
      <Card>
        <UsersList />
      </Card>
      <Card>
        <EventsList />
      </Card>
      <Card>
        <Logs />
      </Card>
    </>
  );
};

export default AdminPanelPage;
