import React, { useState, useEffect } from 'react';

import RollingAnimation from '../../../shared/components/UI/Animations/RollingAnimation';
import './UserItem.css';

const UserItem = props => {
  const [extraInfoFlag, setExtraInfoFlag] = useState(false);
  const [editRoleFlag, setEditRoleFlag] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userStatus, setUserStatus] = useState('');

  useEffect(() => {
    setUserRole(props.userInfo.role);
    setUserStatus(props.userInfo.user_status.s);
  }, [setUserRole, props.userInfo.role]);

  useEffect(() => {
    setUserStatus(props.userInfo.user_status.status);
  }, [setUserStatus, props.userInfo.user_status.status]);

  const extraInfoFlagHandler = () => {
    setExtraInfoFlag(!extraInfoFlag);
  };

  const roleFlagHandler = () => {
    setEditRoleFlag(!editRoleFlag);
  };

  const userRoleHandler = event => {
    roleFlagHandler(false);
    setUserRole(event.target.value);
  };

  const banHandler = () => {
    if (userStatus === 'Active') {
      setUserStatus('Ban');
    } else if (userStatus === 'Ban') {
      setUserStatus('Active');
    }
  };

  return (
    <li className="list-group-item adminpanel__user-list">
      <div className="row adminpanel__row align-items-center text-center mt-2">
        <div className="col-lg-3 adminpanel__col">
          <div className="d-flex adminpanel__lg-justify-content-center">
            <div className="float-right mr-3 pl-3">
              <img
                className="adminpanel__user-avatar"
                src={props.userInfo.avatar || '/src/img/avatar/default.png'}
                alt="avatar img"
              />
            </div>
            <div className="float-left">
              <p>{props.userInfo.first_name}</p>
              <p>{props.userInfo.last_name}</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 adminpanel__col adminpanel__lg-justify-content-center">
          <p className="adminpanel__float-left">{props.userInfo.email}</p>
        </div>

        <div className="col-lg-2 adminpanel__col">
          <p className="adminpanel__float-left">{props.userInfo.phone}</p>
        </div>
        <div className="col-lg-2 adminpanel__col">
          {editRoleFlag ? (
            <select
              className="adminpanel__float-left custom-select"
              value={userRole}
              onChange={userRoleHandler}
              onBlur={userRoleHandler}
            >
              <option value="User">User</option>
              <option value="Moderator">Moderator</option>
              <option value="Admin">Admin</option>
            </select>
          ) : (
            <p className="adminpanel__float-left" onClick={roleFlagHandler}>
              {userRole}
            </p>
          )}
        </div>
        <div className="col-lg-1 adminpanel__col">
          <p
            className={
              'text-uppercase adminpanel__user-status mx-auto ' +
              (userStatus === 'Active'
                ? 'adminpanel__user-status-active'
                : userStatus === 'Inactive'
                ? 'adminpanel__user-status-inactive'
                : 'adminpanel__user-status-banned')
            }
          >
            {userStatus[0]}
          </p>
        </div>
      </div>

      <RollingAnimation triger={extraInfoFlag} mountOnEnter unmountOnExit>
        <div className="row adminpanel__row text-center mb-3 pt-2 align-items-center">
          <div className="col-lg-3 adminpanel__col"></div>
          <div className="col-lg-4 adminpanel__col"></div>
          <div className="col-lg-2 adminpanel__col">
            <p className="adminpanel__float-left">
              Birthday: {props.userInfo.birthday ? props.userInfo.birthday : 'Unknown'}
            </p>
          </div>
          <div className="col-lg-2 adminpanel__col">
            <p className="adminpanel__float-left">Sex: {props.userInfo.sex}</p>
          </div>
          <div className="col-lg-1 adminpanel__col">
            <button className="btn btn-danger" onClick={banHandler}>
              {userStatus === 'banned' ? 'unban' : 'ban'}
            </button>
          </div>
        </div>
      </RollingAnimation>
      <div className="row adminpanel__row">
        <span className="col-12 adminpanel__toggler-icon" onClick={extraInfoFlagHandler}>
          &#8645;
        </span>
      </div>
    </li>
  );
};

export default UserItem;
