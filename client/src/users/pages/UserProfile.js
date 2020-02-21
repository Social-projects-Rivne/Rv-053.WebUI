import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import UserInfo from './../components/UserInfo';
import CategoriesList from './../components/CategoriesList';
import FollowedEventList from './../components/ProfileEvents/FollowedEventList';
import CreatedEventList from './../components/ProfileEvents/CreatedEventList';
import SuccessNote from './../../shared/components/UI/SuccessNote';
import './UserProfile.css';

const UserProfile = () => {
  const history = useHistory();
  const location = useLocation();
  const [showSuccessNote, setShowSuccessNote] = useState(location.state?.showUpdateNotification);
  const closeNote = () => {
    setShowSuccessNote(false);
  };
  useEffect(() => {
    // setShowSuccessNote({ showUpdateNotification: false });
    history.replace(location.pathname, { showUpdateNotification: false });
  }, []);
  return (
    <div className="profile-container">
      {' '}
      {showSuccessNote ? <SuccessNote click={closeNote} /> : null}
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
  );
};

export default UserProfile;
