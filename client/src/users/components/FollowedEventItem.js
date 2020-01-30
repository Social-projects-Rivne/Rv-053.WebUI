import React from 'react';
import { NavLink } from 'react-router-dom';



const FollowedEventItem = (props) => {
    return(
        <NavLink to="/" className="event-item">
            <div>{props.title}</div>
            <div className="event_date">{props.date}</div>
        </NavLink>
    )
}


export default FollowedEventItem;