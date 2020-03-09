import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import UserInfo from './../components/UserInfo';
import CategoriesList from './../components/CategoriesList';
import FollowedEventList from './../components/ProfileEvents/FollowedEventList';
import CreatedEventList from './../components/ProfileEvents/CreatedEventList';
import Notificator from './../../shared/components/UI/Notificator';
import './UserProfile.css';

const UserProfile = () => {
  const history = useHistory();
  const location = useLocation();
  const [showNotificator, setShowNotificator] = useState(location.state?.show);
  const closeNote = () => {
    setShowNotificator(false);
  };
  useEffect(() => {
    history.replace(location.pathname, { show: false });
  }, []);
  return (
    <>
      <Notificator
        className="success-note"
        onExit={closeNote}
        message="Profile updated!"
        show={showNotificator || false}
      />
      <div className="profile-container">
        <section className="profile_inner">
          <UserInfo />
          <CategoriesList />
          <div className="profile-followed_events">
            <FollowedEventList />
          </div>
          <div className="profile-created_events">
            <CreatedEventList />
          </div>
        </section>
      </div>
    </>
  );
};

export default UserProfile;
