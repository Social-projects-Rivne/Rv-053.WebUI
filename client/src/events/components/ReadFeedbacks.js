import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {api_server_url} from '../../shared/utilities/globalVariables';
import FeedbackItem from './FeedbackItem';

const ReadFeedbacks = (props) => {
    const [feedbackData, setFeedbackData] = useState();

    const getFeedbacks = async() => {
        const feedbacks = await axios.get(`${api_server_url}/api/events/feedback/${props.eventId}`);
        setFeedbackData(feedbacks.data.data.feedbacks);
    }

    useEffect(()=>{
        getFeedbacks()
    },[])

    return(
        <div className="feedback-items">
            {feedbackData ? 
                feedbackData.map(feedback => 
                    <FeedbackItem 
                        key={feedback.id}
                        feedback={feedback}
                        currentUser={props.userId}
                    />
                ):
                <p>No feedbacks yet</p>
            }
        </div>
    )
}

export default ReadFeedbacks;