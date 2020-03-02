import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import moment from 'moment';

import Button from '../../../shared/components/UI/Button';

const EventItemCreated = props => {
  const history = useHistory();
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
      <div className="col-lg-2">
        <Button className="float-right" onClick={() => history.push(`/editevent/${props.id}`)}>
          Edit
        </Button>
      </div>
      <div className="col-lg-2">
        <Button className="float-right" onClick={() => props.deleteEvent(props.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default EventItemCreated;
