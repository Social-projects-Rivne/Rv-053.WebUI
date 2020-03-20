import React, {useState, useEffect, useContext, useMemo} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import axios from 'axios';

import {AuthContext} from '../../../shared/context/auth-context';
import {api_server_url} from '../../../shared/utilities/globalVariables';
import FeedbackItem from './FeedbackItem';

const ReadFeedbacks = (props) => {
    const history = useHistory();
    const location = useLocation();
    const accessToken = useContext(AuthContext).token;
    const headers = useMemo(
        () => ({
          Authorization: 'Bearer ' + accessToken
        }),
        [accessToken]
      );


    const [feedbackData, setFeedbackData] = useState();

    const getFeedbacks = async() => {
        const feedbacks = await axios.get(`${api_server_url}/api/events/feedback/${props.eventId}`);
        setFeedbackData(feedbacks.data.data.feedbacks);
    }

    const deleteFeedback = async id => {
        try{
            await axios.delete(
                `${api_server_url}/api/events/feedback/${id}`,
                {headers}
            )
            const withoutDeleted = [...feedbackData];
            withoutDeleted.splice(
                withoutDeleted.findIndex(item => item['id'] === id), 
                1
            )
            setFeedbackData(withoutDeleted);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        getFeedbacks()
    },[])

    useEffect(()=>{
        getFeedbacks();
        history.replace(location.pathname, {rerender: false})
    },[props.flag])


    return(
        <div className="feedback-items">
            {feedbackData ? 
                feedbackData.map(feedback => 
                    <FeedbackItem 
                        key={feedback.id}
                        feedback={feedback}
                        currentUser={props.userId}
                        deleteFeedback={()=>deleteFeedback(feedback.id)}
                    />
                ):
                <p>No feedbacks yet</p>
            }
        </div>
    )
}

export default ReadFeedbacks;