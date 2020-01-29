import React from "react";
import { NavLink } from "react-router-dom";

import "./UserCard.css";

const UserCard = () => {
  return (
    <div className="user-profile">
      <div className="user-header">
        <img
          id="avatar"
          src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/kit-harington-hair-jon-snow-1569167827.jpg?crop=0.439xw:0.878xh;0.0221xw,0.0306xh&resize=480:*"
          alt="Jon Snow"
        />
        <div className="user-names">
          <div id="fullname">Jon Snow</div>
          <div id="username">kingofnorth</div>
        </div>
      </div>
      <div className="user-contacts">
        <div>
          Email: <span id="email">jon@hotmail.com</span>
        </div>
        <div>
          City: <span id="city">Winterfell</span>
        </div>
      </div>
      <NavLink to="/userId">
        <button type="button" className=" btn btn-info">
          Follow
        </button>
      </NavLink>
    </div>
  );
};

export default UserCard;
