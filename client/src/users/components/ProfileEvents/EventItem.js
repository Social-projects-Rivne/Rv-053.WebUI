import React from 'react';
import { NavLink } from 'react-router-dom';

const EventItem = props => {
  return (
    <NavLink to='/profile/my' className='user_profile_event-item'>
      <div>{props.title}</div>
      <div className='event_date'>{props.date}</div>
      <button
        className='link-btn'
        onClick={() => props.unfollowFromEvent(props.id)}
      >
        unsubscribe
      </button>
    </NavLink>
  );
};

export default EventItem;
