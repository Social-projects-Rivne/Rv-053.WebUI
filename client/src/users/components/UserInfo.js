import React, { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';

import { api_server_url } from '../../shared/utilities/globalVariables';
import { AuthContext } from '../../shared/context/auth-context';

const UserInfo = () => {
  const accessToken = useContext(AuthContext).token;

  const [userData, setUserData] = useState({ user: {}, isMyProfile: false });
  const userId = useParams().userId;
  const headers = useMemo(
    () => ({
      Authorization: 'Bearer ' + accessToken
    }),
    [accessToken]
  );

  const getUserData = useCallback(async () => {
    if (userId === 'my') {
      const res = await axios.get(api_server_url + '/api/user/current', {
        headers
      });
      setUserData({ user: res.data.data.user, isMyProfile: true });
    } else {
      const res = await axios.get(api_server_url + '/api/user/' + userId, {
        headers
      });
      setUserData({ user: res.data.data.user, isMyProfile: false });
    }
  }, [userId, headers]);
  useEffect(() => {
    if (accessToken) {
      getUserData();
    }
  }, [accessToken, userId, getUserData]);
  return (
    <div className={userId === 'my' ? 'profile-top' : null}>
      {userData ? (
        <>
          <div className="profile-avatar__wrapper">
            {!userData.user.avatar ? (
              <span className="profile-avatar">
                <span className="profile-avatar__head"></span>
                <span className="profile-avatar__body"></span>
              </span>
            ) : (
              <img
                className="profile-avatar"
                src={userData.user.avatar ? userData.user.avatar : '/'}
                alt=""
              />
            )}
          </div>
          <div className="profile-info">
            <div className="profile-name">
              {userData.user.first_name} {userData.user.last_name}
            </div>
            <div className="profile-email">{userData.user.email} </div>
            {userId === 'my' ? (
              <div className="profile_btn">
                <NavLink to="/addevent" className="link-btn">
                  Add event
                </NavLink>
                <NavLink to="/editprofile" className="link-btn">
                  Edit profile
                </NavLink>
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default UserInfo;
