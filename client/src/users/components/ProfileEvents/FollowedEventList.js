import React, { useState, useEffect } from 'react';
import axios from 'axios';

import FollowedEventItem from './FollowedEventItem';

// const followedEvents = [
//     {
//         eventId: 1,
//         name: 'Walking with dog',
//         datetime: '20.09.19'
//     },
//     {
//         eventId: 2,
//         name: 'Nature',
//         datetime: '09.08.20'
//     }
// ]


const FollowedEventList = () => {

    const [ followedEventsState, setFollowedEventsState ] = useState({followedEvents});

    useEffect(()=>{
        const followedEvents = await axios.get();
        setFollowedEventsState(followedEvents);
    },[])

    return(
        <div className="event_list-item">
            <h3 className="profile-title">Your followed events</h3>
            {followedEventsState.followedEvents.map(event =>
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