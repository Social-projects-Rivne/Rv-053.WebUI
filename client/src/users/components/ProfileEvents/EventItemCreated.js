import React, { useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

import ConfirmationWindow from './../../../shared/components/UI/ConfirmationWindow';
import Button from '../../../shared/components/UI/Button';

const EventItemCreated = props => {
  const userId = useParams().userId;
  const history = useHistory();
  const [confirmFlag, setConfirmFlag] = useState(false);
  const date = moment(+props.date)
    .format('DD MM YYYY')
    .split(' ')
    .join('.');
  return (
    <>
      {confirmFlag ? (
        <ConfirmationWindow
          message={'Do you want to delete "' + props.title + '"?'}
          onYes={() => props.deleteEvent(props.id)}
          onNo={() => setConfirmFlag(false)}
        />
      ) : null}
      <div
        className="user_profile_event-item align-items-center"
        style={{ width: '100%', verticalAlign: 'middle' }}
      >
        <NavLink to={`/event/${props.id}`} className="col-lg-5 align-middle">
          {props.title}{' '}
        </NavLink>

        <div className={userId == 'my' ? 'col-lg-3' : null}>{date}</div>
        {userId == 'my' ? (
          <>
            <div className="col-lg-2">
              <Button
                className="float-right"
                onClick={() => history.push(`/editevent/${props.id}`)}
              >
                Edit
              </Button>
            </div>
            <div className="col-lg-2">
              <Button className="float-right" onClick={() => setConfirmFlag(true)}>
                Delete
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default EventItemCreated;
