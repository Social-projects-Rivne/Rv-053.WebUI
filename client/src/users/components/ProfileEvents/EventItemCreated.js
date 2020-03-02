import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Button from '../../../shared/components/UI/Button';

const EventItemCreated = props => {
  const history = useHistory();
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

      <div className="col-lg-3 event_date">{props.date}</div>
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
