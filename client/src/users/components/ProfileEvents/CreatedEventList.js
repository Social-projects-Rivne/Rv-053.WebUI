import React from 'react';


import CreatedEventItem from './CreatedEventItem';


const createdEvents = [
    {
        eventId: 1,
        name: 'Riding on the bike',
        datetime: '13.01.19'
    },
    {
        eventId: 2,
        name: 'Picnic',
        datetime: '06.12.20'
    }
]


const CreatedEventList = () => {
    return(
        <div  className="event_list-item">
            <h3 className="profile-title">Your created events</h3>
            {createdEvents.map(event => 
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