import React from 'react';

import Card from '../../shared/components/UI/Card';
import UsersList from '../components/Users/AdminUsersList';
import EventsList from '../components/Events/AdminEventsList';
import Logs from '../components/Logs/Logs';
import './AdminPanel.css';

const AdminPanelPage = () => {
  return (
    <div className="my__container">
      <Card className="adminpanel_card">
        <UsersList />
      </Card>
      <Card className="adminpanel_card">
        <EventsList />
      </Card>
      <Card className="adminpanel_card">
        <Logs />
      </Card>
    </div>
  );
};

export default AdminPanelPage;
