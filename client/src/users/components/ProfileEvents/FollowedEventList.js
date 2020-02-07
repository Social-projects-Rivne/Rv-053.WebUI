import React from 'react';

import FollowedEventItem from './FollowedEventItem';

const followedEvents = [
    {
        eventId: 1,
        name: 'Walking with dog',
        datetime: '20.09.19'
    },
    {
        eventId: 2,
        name: 'Nature',
        datetime: '09.08.20'
    }
]


const FollowedEventList = () => {
    return(
        <div className="event_list-item">
            <h3 className="profile-title">Your followed events</h3>
            {followedEvents.map(event =>
                <FollowedEventItem
                    key={event.eventId} 
                    title={event.name}
                    date={event.datetime}
                />
            )}
    </div>

    )
}


export default FollowedEventList;