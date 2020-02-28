import React from 'react';
import { NavLink } from 'react-router-dom';

import './UserCard.css';

const UserCard = props => {
  return (
    <div className="user-profile">
      <div className="user-header">
        <img id="avatar" src={props.owner.avatar} alt="Jon Snow" />
        <div className="user-names">
          <div id="fullname">
            {props.owner.first_name + ' '}
            {props.owner.last_name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
