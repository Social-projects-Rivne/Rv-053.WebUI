import React from 'react';
import { NavLink } from 'react-router-dom';

import './UserCard.css';
import { parseWithOptions } from 'date-fns/fp';

const UserCard = props => {
  return (
    <div className="user-profile">
      <div className="user-header">
        <img
          id="avatar"
          src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/kit-harington-hair-jon-snow-1569167827.jpg?crop=0.439xw:0.878xh;0.0221xw,0.0306xh&resize=480:*"
          alt="Jon Snow"
        />
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
