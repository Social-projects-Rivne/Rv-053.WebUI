import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import RollingAnimation from '../../../shared/components/UI/Animations/RollingAnimation';
import { api_server_url } from '../../../shared/utilities/globalVariables';
import { AuthContext } from '../../../shared/context/auth-context';
import Selector from '../../../shared/components/FormElements/Select';
import './AdminUserItem.css';

const AdminUserItem = props => {
  const [extraInfoFlag, setExtraInfoFlag] = useState(false);
  const [editRoleFlag, setEditRoleFlag] = useState(false);
  const [userRole, setUserRole] = useState(props.userInfo.role);
  const [userStatus, setUserStatus] = useState(
    props.userInfo.user_status.status === 'Ban' ? 'Banned' : props.userInfo.user_status.status
  );
  const userAccessRole = props.accessRole;
  const accessToken = useContext(AuthContext).token;
  const headers = {
    Authorization: 'Bearer ' + accessToken
  };

  const checkUserAccess = () => {
    if (userAccessRole === 'Admin') {
      return true;
    } else {
      return false;
    }
  };

  const extraInfoFlagHandler = () => {
    setExtraInfoFlag(!extraInfoFlag);
  };

  const changeUserRole = async (id, role) => {
    try {
      const api_role =
        role === 'User'
          ? 'role-user/'
          : role === 'Moderator'
          ? 'role-moderator/'
          : role === 'Admin'
          ? 'role-admin/'
          : '';
      const api_url = api_server_url + '/api/user/' + api_role + id;
      const res = await axios.put(api_url, {}, { headers });
      if (res.data.status === 'success') {
        setUserRole(role);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const changeUserStatus = async (id, action) => {
    try {
      const api_url = api_server_url + '/api/user/' + action + '/' + id;
      if (action === 'ban') {
        const res = await axios.post(api_url, {}, { headers });
        if (res.data.status === 'success') {
          setUserStatus('Banned');
        }
      } else if (action === 'unban') {
        const res = await axios.delete(api_url, { headers }, {});
        if (res.data.status === 'success') {
          setUserStatus('Active');
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const roleFlagHandler = () => {
    setEditRoleFlag(!editRoleFlag);
  };

  const userRoleHandler = roleItem => {
    if (userRole === roleItem.title) {
      return;
    } else {
      changeUserRole(props.userInfo.id, roleItem.title);
    }
  };

  const banHandler = () => {
    if (userStatus === 'Active') {
      changeUserStatus(props.userInfo.id, 'ban');
    } else if (userStatus === 'Banned') {
      changeUserStatus(props.userInfo.id, 'unban');
    }
  };

  return (
    <li className="adminpanel__user-list">
      <div className="row adminpanel__row align-items-center text-center mt-2">
        <div
          className={props.collapseState ? 'col-lg-5 adminpanel__col' : 'col-lg-3 adminpanel__col'}
        >
          <div className="d-flex adminpanel__lg-justify-content-center">
            <div className="float-right mr-3 pl-3">
              <img
                className="adminpanel__user-avatar"
                src={props.userInfo.avatar || '/src/img/avatar/default.png'}
                alt="avatar img"
              />
            </div>
            <div className="float-left">
              <Link to={'/profile/' + props.userInfo.id} className="adminpanel__link">
                <p className="text-left">{props.userInfo.first_name}</p>
                <p className="text-left">{props.userInfo.last_name}</p>
              </Link>
            </div>
          </div>
        </div>
        <div
          className={
            props.collapseState
              ? 'col-lg-5 adminpanel__col adminpanel__lg-justify-content-center'
              : 'col-lg-4 adminpanel__col adminpanel__lg-justify-content-center'
          }
        >
          <p className="adminpanel__float-left">{props.userInfo.email}</p>
        </div>
        <div
          className={
            props.collapseState ? 'col-lg-2 adminpanel__col hide' : 'col-lg-2 adminpanel__col '
          }
        >
          <p className="adminpanel__float-left">{props.userInfo.phone}</p>
        </div>
        <div
          className={
            props.collapseState ? 'col-lg-3 adminpanel__col hide' : 'col-lg-2 adminpanel__col'
          }
        >
          <button
            className="adminpanel__float-left cursor-pointer adminpanel__button-flat"
            onFocus={roleFlagHandler}
            onBlur={roleFlagHandler}
            disabled={!checkUserAccess()}
          >
            {userRole}
          </button>
          <Selector
            triger={editRoleFlag}
            items={[
              { icon: '', title: 'Admin', info: '' },
              { icon: '', title: 'Moderator', info: '' },
              { icon: '', title: 'User', info: '' }
            ]}
            onChange={userRoleHandler}
            className=""
          />
        </div>
        <div
          className={props.collapseState ? 'col-lg-2 adminpanel__col' : 'col-lg-1 adminpanel__col'}
        >
          <p
            className={
              'text-uppercase badge ' +
              (userStatus === 'Active'
                ? 'adminpanel__user-status-active'
                : userStatus === 'Inactive'
                ? 'badge-secondary'
                : 'badge-danger')
            }
          >
            {userStatus}
          </p>
        </div>
      </div>
      {!props.collapseState ? (
        <>
          <RollingAnimation triger={extraInfoFlag} mountOnEnter unmountOnExit>
            <div className="row adminpanel__row text-center mb-3 pt-2 align-items-center">
              <div className="col-lg-3 adminpanel__col"></div>
              <div className="col-lg-4 adminpanel__col">
                <p className="adminpanel__float-left">
                  Birthday:{' '}
                  {props.userInfo.birthday
                    ? moment(+props.userInfo.birthday)
                        .format('DD MM YYYY')
                        .split(' ')
                        .join('.')
                    : 'Unknown'}
                </p>
              </div>
              <div className="col-lg-2 adminpanel__col">
                <p className="adminpanel__float-left">Sex: {props.userInfo.sex}</p>
              </div>
              <div className="col-lg-3 adminpanel__col">
                <button
                  className="button-danger adminpanel__float-right"
                  onClick={banHandler}
                  disabled={
                    !checkUserAccess() && (userRole === 'Admin' || userRole === 'Moderator')
                  }
                >
                  {userStatus === 'Banned' ? 'unban' : 'ban'}
                </button>
              </div>
            </div>
          </RollingAnimation>
          <div className="row adminpanel__row">
            <span
              className={
                'col-12 adminpanel__toggler-icon ' +
                (extraInfoFlag ? 'adminpanel__toggler-icon_expanded' : '')
              }
              onClick={extraInfoFlagHandler}
            >
              {extraInfoFlag ? <>&#8657;</> : <>&#8659;</>}
            </span>
          </div>
        </>
      ) : null}
    </li>
  );
};

export default AdminUserItem;
