import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

import Button from '../../../shared/components/UI/Button';
import ConfirmationWindow from './../.././../shared/components/UI/ConfirmationWindow';

const EventItemFollowed = props => {
  const [confirmFlag, setConfirmFlag] = useState(false);

  const date = moment(+props.date)
    .format('DD MM YYYY')
    .split(' ')
    .join('.');

  const confirmUnfollowFormEvent = () => {
    setConfirmFlag(true);
  };

  return (
    <>
      {confirmFlag ? (
        <ConfirmationWindow
          message={'Do you want to leave "' + props.title + '"?'}
          onYes={() => props.unfollowFromEvent(props.id)}
          onNo={() => setConfirmFlag(false)}
        />
      ) : null}
      <div
        className="user_profile_event-item align-items-center"
        style={{ width: '100%', verticalAlign: 'middle' }}
      >
        <div className="col-lg-5 align-middle">
          <NavLink to={'/event/' + props.id}>{props.title}</NavLink>
        </div>
        <div className="col-lg-3 event_date">{date}</div>
        <div className="col-lg-4">
          <Button className="float-right" onClick={confirmUnfollowFormEvent}>
            Unsubscribe
          </Button>
        </div>
      </div>
    </>
  );
};

export default EventItemFollowed;
