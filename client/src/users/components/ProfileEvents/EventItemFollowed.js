import React from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

import Button from '../../../shared/components/UI/Button';

const EventItemFollowed = props => {
  const date = moment(+props.date)
    .format('DD MM YYYY')
    .split(' ')
    .join('.');
  return (
    <div
      className="user_profile_event-item align-items-center"
      style={{ width: '100%', verticalAlign: 'middle' }}
    >
      <div className="col-lg-5 align-middle">
        <NavLink to={`/event/${props.id}`} className="user-profile__link">
          {props.title}
        </NavLink>
      </div>

      <div className="col-lg-3 event_date">{date}</div>
      <div className="col-lg-4">
        <Button className="float-right" onClick={() => props.unfollowFromEvent(props.id)}>
          Unsubscribe
        </Button>
      </div>
    </div>
  );
};

export default EventItemFollowed;
