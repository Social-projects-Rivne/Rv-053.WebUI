import React from 'react';

import UserInfo from './../components/UserInfo';
import CategoriesList from './../components/CategoriesList';
import FollowedEventList from './../components/ProfileEvents/FollowedEventList';
import CreatedEventList from './../components/ProfileEvents/CreatedEventList';
import './UserProfile.css';

const UserProfile = () => {
  return (
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
  );
};

export default UserProfile;
