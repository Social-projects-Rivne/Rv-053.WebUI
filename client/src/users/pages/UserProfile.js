import React, { useState, useEffect } from 'react';

import UserInfo from './../components/UserInfo';
import CategoriesList from './../components/CategoriesList';
import FollowedEventList from './../components/ProfileEvents/FollowedEventList';
import CreatedEventList from './../components/ProfileEvents/CreatedEventList';
import './UserProfile.css';
import { useLocation, useHistory } from 'react-router-dom';

const UserProfile = () => {
  const history = useHistory();
  const location = useLocation();
  const [showSuccessNote, setShowSuccessNote] = useState(location.state?.showUpdateNotification);

  useEffect(() => {
    // setShowSuccessNote({ showUpdateNotification: false });
    history.replace(location.pathname, { showUpdateNotification: false });
  }, []);
  return (
    <div className="profile-container">
      <section className="profile_inner">
        {showSuccessNote ? 'WOHOO' : null}
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
  );
};

export default UserProfile;
