import React, {useState, useMemo, useContext} from 'react';
import {NavLink} from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

import {AuthContext} from '../../shared/context/auth-context';
import {api_server_url} from '../../shared/utilities/globalVariables';
import ConfirmationWindow from '../../shared/components/UI/ConfirmationWindow';
import EditFeedbackItem from './EditFeedbackItem';

const FeedbackItem = (props) => {
    const [showConfirmWindow, setShowConfirmWindow] = useState(false);
    const [editFeedbackFlag, setEditFeedbackFlag] = useState(false);
    const accessToken = useContext(AuthContext).token;
    const headers = useMemo(
        () => ({
          Authorization: 'Bearer ' + accessToken
        }),
        [accessToken]
      );

    const date = moment(+props.feedback.date)
    .format('DD.MM.YY');

    const owner_id = props.feedback.user_event.user_id;
    const feedbackId = props.feedback.id;

    const confirmDeleteFeedback = () => {
        setShowConfirmWindow(true);
    }

    const deleteFeedback = async() => {
        try{
            await axios.delete(
                `${api_server_url}/api/events/feedback/${feedbackId}`,
                { headers }
            )
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <>
            {showConfirmWindow ? (
                <ConfirmationWindow 
                    message="Are you sure?"
                    onNo={()=>setShowConfirmWindow(false)}
                    onYes={deleteFeedback}
                />
                ) : null
            }
            {!editFeedbackFlag ? (
                <div className="feedback-item">
                    <div>{props.feedback.feedback}</div>
                        <div className="feedback-item_panel">
                            <div className="feedback-item_info">
                                <span className="feedback-date">{date}</span>
                                <NavLink to = {`/profile/${props.feedback.user_event.user_id}`} className="feedback-author_link">
                                    <span className="feedback-author">
                                        {props.feedback.user_event.user.first_name}
                                    </span>
                                </NavLink>
                            </div>
                            {owner_id === props.currentUser ? (
                                <div className="feedback-item_manage">
                                    <button className="feedback-edit icon-pencil button-link" onClick={()=>setEditFeedbackFlag(true)}></button>
                                    <button className="feedback-delete icon-trash button-link" onClick={confirmDeleteFeedback}></button>
                                </div>
                                ):null
                            }
                        </div>
                    <div className="feedback-item_tail"></div>
                </div>
            ):(
                <>
                {owner_id === props.currentUser ? (
                    <EditFeedbackItem 
                         feedback={props.feedback}   
                    />
                    ):null
                }
                </>
            )}
        </>
    )
}

export default FeedbackItem;