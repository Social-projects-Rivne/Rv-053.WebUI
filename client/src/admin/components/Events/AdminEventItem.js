import React, { useState, useEffect } from 'react';

import RollingAnimation from '../../../shared/components/UI/Animations/RollingAnimation';

const AdminEventItem = props => {
  const [extraInfoFlag, setExtraInfoFlag] = useState(false);

  const extraInfoFlagHandler = () => {
    setExtraInfoFlag(!extraInfoFlag);
  };
  console.log(props.eventInfo);
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
          <p className="adminpanel__float-left adminpanel__text-left">{props.eventInfo.name}</p>
        </div>
        <div className="col-lg-2 adminpanel__col">
          <p className="adminpanel__text-left">{props.eventInfo.user.first_name}</p>
          <p className="adminpanel__text-left">{props.eventInfo.user.last_name}</p>
        </div>
        <div className="col-lg-4 adminpanel__col">
          <p className="adminpanel__text-left">{props.eventInfo.user.email}</p>
        </div>
        <div className="col-lg-1 adminpanel__col">
          <p className="adminpanel__float-left">{props.eventInfo.price}</p>
        </div>
        <div className="col-lg-1 adminpanel__col">
          <p
            className={
              'text-uppercase badge ' +
              (props.eventInfo.status === 'Active'
                ? 'adminpanel__user-status-active'
                : props.eventInfo.status === 'Inactive'
                ? 'badge-secondary'
                : 'badge-danger')
            }
          >
            {props.eventInfo.status}
          </p>
        </div>
      </div>

      <RollingAnimation triger={extraInfoFlag} mountOnEnter unmountOnExit>
        <div className="row adminpanel__row text-center mb-3 pt-2 align-items-center">
          <div className="col-12 adminpanel__col adminpanel__lg-justify-content-center">
            <p className="adminpanel__float-left text-left">
              {props.eventInfo.description ? props.eventInfo.description : 'Here is no description'}
            </p>
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
