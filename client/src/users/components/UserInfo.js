import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const UserInfo = props => {
  return (
    <div className="profile-top">
      <div className="profile-avatar">
        {!props.item.avatarUrl ? <span>Add photo</span> : <img src="/" alt="" />}
      </div>
      <div className="profile-info">
        <div className="profile-name">
          {props.name} {props.surname}
        </div>
        <div className="profile-email">{props.email} </div>
        <div className="profile_btn">
          <NavLink to="/" className="profile_btn-item">
            Add event
          </NavLink>
          <NavLink to="/" className="profile_btn-item">
            Edit profile
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
