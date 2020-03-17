import React from 'react';

import Notificator from '../../shared/components/UI/Notificator';
import LeaveFeedbacks from './LeaveFeedbacks';
import ReadFeedbacks from './ReadFeedbacks';

const EventFeedbacks = (props) => {
    return(
        <>
            <div className="my__container">
                {props.event.isSubscribe && props.event.past ? (
                    <LeaveFeedbacks 
                        eventId={props.event.id} 
                        userId={props.event.currentUser_id}
                    />
                    ):null
                }
                {props.event.past ? (
                    <ReadFeedbacks 
                        eventId={props.event.id}
                        past={props.event.past}
                        userId={props.event.currentUser_id}
                    />
                    ):null
                }
            </div>
        </>
    )
}

export default EventFeedbacks;