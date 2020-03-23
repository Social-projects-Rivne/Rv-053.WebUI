import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';

import LeaveFeedbacks from './LeaveFeedbacks';
import ReadFeedbacks from './ReadFeedbacks';

const EventFeedbacks = (props) => {
    const location = useLocation();

    const [changeFlag, setChangeFlag] = useState(false);

    useEffect(()=>{
        setChangeFlag(location.state?.rerender)
    },[location])

    return(
        <>
            <div className="my__container">
                {props.event.isSubscribe && props.event.past ? (
                    <LeaveFeedbacks 
                        eventId={props.event.id} 
                        userId={props.event.currentUser_id}
                        flag={changeFlag}
                    />
                    ):null
                }
                {props.event.past ? (
                    <ReadFeedbacks 
                        eventId={props.event.id}
                        past={props.event.past}
                        userId={props.event.currentUser_id}
                        flag={changeFlag}
                    />
                    ):null
                }
            </div>
        </>
    )
}

export default EventFeedbacks;