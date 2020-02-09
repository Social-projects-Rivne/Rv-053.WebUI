import React, { useEffect, useState, useContext } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';

import { api_server_url } from '../../shared/utilities/globalVariables';
import { AuthContext } from '../../shared/context/auth-context';

const UserInfo = props => {
  const auth = useContext(AuthContext);
  const accessToken = auth.token;
  const [userData, setUserData] = useState();
  const userId = useParams().id;
  const headers = {
    Authorization: 'Bearer ' + accessToken
  };

  const getUserData = async () => {
    if (userId === 'my') {
      const res = await axios.get(api_server_url + '/api/user/current', {
        headers
      });
      setUserData(res.data.data.user);
    } else {
      const res = await axios.get(api_server_url + '/api/user//by-id/' + userId, {
        headers
      });
      setUserData(res.data.data.user);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getUserData();
    }
  }, [accessToken]);

  return (
    <div className="profile-top">
      {userData ? (
        <>
          <div className="profile-avatar">
            {!userData.avatar ? (
              <span>Add photo</span>
            ) : (
              <img src={userData.avatar ? userData.avatar : '/'} alt="" />
            )}
          </div>
          <div className="profile-info">
            <div className="profile-name">
              {userData.first_name} {userData.last_name}
            </div>
            <div className="profile-email">{userData.email} </div>
            <div className="profile_btn">
              <NavLink to="/addevent" className="profile_btn-item">
                Add event
              </NavLink>
              <NavLink to="/" className="profile_btn-item">
                Edit profile
              </NavLink>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default UserInfo;
