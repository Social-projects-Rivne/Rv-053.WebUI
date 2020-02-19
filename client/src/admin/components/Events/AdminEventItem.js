import React, { useState, useEffect } from 'react';

import RollingAnimation from '../../../shared/components/UI/Animations/RollingAnimation';

const AdminEventItem = props => {
  const [extraInfoFlag, setExtraInfoFlag] = useState(false);

  const extraInfoFlagHandler = () => {
    setExtraInfoFlag(!extraInfoFlag);
  };

  return (
    <li className="list-group-item adminpanel__user-list">
      <div className="row adminpanel__row align-items-center text-center mt-2">
        <div className="col-lg-3 adminpanel__col">
          <div className="d-flex adminpanel__lg-justify-content-center">
            <div className="float-right mr-3 pl-3">
              <img
                className="adminpanel__user-avatar"
                src={props.eventInfo.cover || '/src/img/events/default.png'}
                alt={props.eventInfo.cover || '/src/img/events/default.png'}
              />
            </div>
            <div className="float-left">
              <p className="text-left">{props.eventInfo.name}</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 adminpanel__col adminpanel__lg-justify-content-center">
          <p className="adminpanel__float-left">{props.eventInfo.description}</p>
        </div>
      </div>

      <RollingAnimation triger={extraInfoFlag} mountOnEnter unmountOnExit>
        <div className="row adminpanel__row text-center mb-3 pt-2 align-items-center"></div>
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
