import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import RollingAnimation from '../../../shared/components/UI/Animations/RollingAnimation';
import { AuthContext } from '../../../shared/context/auth-context';
import { api_server_url } from '../../../shared/utilities/globalVariables';

const AdminEventItem = props => {
  const history = useHistory();
  const [extraInfoFlag, setExtraInfoFlag] = useState(false);
  const [eventStatus, setEventStatus] = useState(props.eventInfo.status);
  const [sendingToServerFlag, setSendingToServerFlag] = useState(false);
  const accessToken = useContext(AuthContext).token;
  const headers = {
    Authorization: 'Bearer ' + accessToken
  };

  const extraInfoFlagHandler = () => {
    setExtraInfoFlag(!extraInfoFlag);
  };

  const changeEventStatus = async () => {
    try {
      if (eventStatus === 'Active') {
        setSendingToServerFlag(true);
        const res = await axios.put(
          api_server_url + '/api/events/' + props.eventInfo.id + '/ban',
          {},
          { headers }
        );
        setSendingToServerFlag(false);
        if (res.data.status === 'success') {
          setEventStatus('Banned');
        }
      } else {
        setSendingToServerFlag(true);
        const res = await axios.put(
          api_server_url + '/api/events/' + props.eventInfo.id + '/unban',
          {},
          { headers }
        );
        if (res.data.status === 'success') {
          setEventStatus('Active');
        }
        setSendingToServerFlag(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <li className="adminpanel__user-list">
      <div className="row adminpanel__row align-items-center text-center mt-2">
        <div className="col-lg-1 adminpanel__col">
          <img
            className="adminpanel__event-cover"
            src={props.eventInfo.cover || '/src/img/events/E.png'}
            alt={props.eventInfo.cover || '/src/img/events/E.png'}
          />
        </div>
        <div className="col-lg-3 adminpanel__col">
          <p className="adminpanel__text-left">{props.eventInfo.name}</p>
        </div>
        <div className="col-lg-2 adminpanel__col">
          <p className="adminpanel__text-left">{props.eventInfo.user.first_name}</p>
          <p className="adminpanel__text-left">{props.eventInfo.user.last_name}</p>
        </div>
        <div className="col-lg-3 adminpanel__col">
          <p className="adminpanel__text-left">{props.eventInfo.user.email}</p>
        </div>
        <div className="col-lg-2 adminpanel__col">
          <button
            className="my__button"
            onClick={() => {
              history.push('/editevent/' + props.eventInfo.id);
            }}
          >
            Edit
          </button>
        </div>
        <div className="col-lg-1 adminpanel__col">
          <p
            onClick={!sendingToServerFlag ? changeEventStatus : null}
            className={
              'text-uppercase badge adminpanel__badge-button ' +
              (eventStatus === 'Active'
                ? 'adminpanel__user-status-active'
                : eventStatus === 'Inactive'
                ? 'badge-secondary'
                : 'badge-danger')
            }
          >
            {eventStatus}
          </p>
        </div>
      </div>

      <RollingAnimation triger={extraInfoFlag} mountOnEnter unmountOnExit>
        <div className="row adminpanel__row text-center mb-3 pt-2 align-items-center">
          <div className="col-lg-11 adminpanel__col adminpanel__lg-justify-content-center">
            <p className="adminpanel__text-left">
              {props.eventInfo.description ? props.eventInfo.description : 'Here is no description'}
            </p>
          </div>
          <div className="col-lg-1 adminpanel__col">
            {props.eventInfo.price ? (
              <>
                <p className="adminpanel__text-left">{props.eventInfo.price.match(/\d+/)[0]}</p>
                <p className="adminpanel__text-left">
                  {props.eventInfo.price.match(/[A-Za-zа-яА-ЯіІёЁ]+/)}
                </p>
              </>
            ) : (
              <p className="adminpanel__text-left">Free</p>
            )}
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

export default AdminEventItem;
