import React from 'react';
import {NavLink} from 'react-router-dom';
import moment from 'moment';

const FeedbackItem = (props) => {
    const date = moment(+props.feedback.date)
    .format('DD.MM.YY');
    return(
        <div className="feedback-item">
            <div>{props.feedback.feedback}</div>
            <div className="feedback-item_info">
                <span className="feedback-date">{date}</span>
                <NavLink to = {`/profile/${props.feedback.user_event.user_id}`} className="feedback-author_link">
                    <span className="feedback-author">
                        {props.feedback.user_event.user.first_name}
                    </span>
                </NavLink>
            </div>
            <div className="feedback-item_tail"></div>
        </div>
    )
}

export default FeedbackItem;