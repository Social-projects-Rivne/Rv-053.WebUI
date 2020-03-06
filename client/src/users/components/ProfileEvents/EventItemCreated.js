import React from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

import Button from '../../../shared/components/UI/Button';

const EventItemCreated = props => {
  const userId = useParams().userId;
  const history = useHistory();
  const date = moment(+props.date)
    .format('DD MM YYYY')
    .split(' ')
    .join('.');
  return (
    <NavLink
      to={`/event/${props.id}`}
      className="user_profile_event-item align-items-center"
      style={{ width: '100%', verticalAlign: 'middle' }}
    >
      <div className="col-lg-5 align-middle">{props.title}</div>

      <div className={userId === 'my' ? 'col-lg-3' : null}>{date}</div>
      {userId === 'my' ? (
        <>
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
        </>
      ) : null}
    </NavLink>
  );
};

export default EventItemCreated;
