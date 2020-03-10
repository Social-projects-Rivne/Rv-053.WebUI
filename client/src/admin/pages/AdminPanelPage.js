import React, { useState } from 'react';

import Card from '../../shared/components/UI/Card';
import UsersList from '../components/Users/AdminUsersList';
import EventsList from '../components/Events/AdminEventsList';
import './AdminPanel.css';

const AdminPanelPage = () => {
  const [userListCollapseFlag, setUserListCollapseFlag] = useState(true);
  const [eventListCollapseFlag, setEventListCollapseFlag] = useState(true);

  const userListCollapseFlagHandler = () => {
    setUserListCollapseFlag(!userListCollapseFlag);
  };
  const eventListCollapseFlagHandler = () => {
    setEventListCollapseFlag(!eventListCollapseFlag);
  };
  return (
    <div className="my__container">
      <div className="row">
        <div className={userListCollapseFlag ? 'col-6' : 'col-12'}>
          <Card className="adminpanel_card">
            <UsersList collapse={userListCollapseFlag} />
            <span className="adminpanel__expander" onClick={userListCollapseFlagHandler}>
              {userListCollapseFlag ? <>&#8600;</> : <>&#8598;</>}
            </span>
          </Card>
        </div>
        <div className={eventListCollapseFlag ? 'col-6' : 'col-12'}>
          <Card className="adminpanel_card">
            <EventsList collapse={eventListCollapseFlag} />
            <span className="adminpanel__expander" onClick={eventListCollapseFlagHandler}>
              {eventListCollapseFlag ? <>&#8600;</> : <>&#8598;</>}
            </span>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelPage;
