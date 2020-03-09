import React from 'react';

import Card from '../../shared/components/UI/Card';
import UsersList from '../components/Users/AdminUsersList';
import EventsList from '../components/Events/AdminEventsList';
import AdminSearchUsers from '../components/Users/AdminSearchUsers';
import AdminSearchEvents from '../components/Events/AdminSearchEvents';
import './AdminPanel.css';

const AdminPanelPage = () => {
  return (
    <div className="my__container">
      <Card className="adminpanel_card">
        <AdminSearchUsers />
        <UsersList />
      </Card>
      <Card className="adminpanel_card">
        <AdminSearchEvents />
        <EventsList />
      </Card>
    </div>
  );
};

export default AdminPanelPage;
