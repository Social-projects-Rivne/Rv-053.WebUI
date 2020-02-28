import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../../shared/components/UI/Button';

const EventItemFollowed = props => {
  return (
    <NavLink to='/profile/my' className='user_profile_event-item'>
      <div>{props.title}</div>
      <div className='event_date'>{props.date}</div>
      <Button onClick={() => props.unfollowFromEvent(props.id)}>
        Unsubscribe
      </Button>
    </NavLink>
  );
};

export default EventItemFollowed;
