import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CreatedEventItem from './CreatedEventItem';


// const createdEvents = [
//     {
//         eventId: 1,
//         name: 'Riding on the bike',
//         datetime: '13.01.19'
//     },
//     {
//         eventId: 2,
//         name: 'Picnic',
//         datetime: '06.12.20'
//     }
// ]


const CreatedEventList = () => {

const [ createdEventState, setCreatedEventState ] = useState({createdEvents});

useEffect(()=>{
    const createdEvents = await axios.get();
    setCreatedEventState(createdEvents);
}, [])

    return(
        <div  className="event_list-item">
            <h3 className="profile-title">Your created events</h3>
            {createdEventState.createdEvents.map(event => 
                <CreatedEventItem
                    key={event.eventId} 
                    title={event.name}
                    date={event.datetime}
                />
            )}
        </div>

    )

}

export default CreatedEventList;