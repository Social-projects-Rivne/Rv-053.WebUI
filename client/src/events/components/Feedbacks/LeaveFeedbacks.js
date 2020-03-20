import React, {useMemo, useContext} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import axios from 'axios';

import {api_server_url} from '../../../shared/utilities/globalVariables';
import {AuthContext} from '../../../shared/context/auth-context';
import {useForm} from '../../../shared/hooks/useForm';
import {VAL_MIN_LENGTH} from '../../../shared/utilities/validation';
import Input from '../../../shared/components/FormElements/Input';
import './EventFeedbacks.css'

const LeaveFeedbacks = (props) => {      
    const history = useHistory();  
    const location = useLocation();
    const accessToken = useContext(AuthContext).token;
    const headers = useMemo(
        () => ({
          Authorization: 'Bearer ' + accessToken
        }),
        [accessToken]
      );

    const [formState, inputHandler, setFormData] = useForm({
        feedback:{
            value: '',
            isValid: false
        }
    })
    
    const submitFeedbackHandler = (event) => {
        event.preventDefault();
        addFeedback();
    }


    const addFeedback = async() => {
        if(formState.formValidity){
            try{
                const feedbackData = {
                    feedback: formState.inputs.feedback.value
                }
                await axios.post(
                    `${api_server_url}/api/events/feedback/${props.userId}/${props.eventId}`,
                    feedbackData,
                    {headers}
                ) 
                history.replace(location.pathname, {rerender:true});
            }   
            catch (err) {
                console.log(err);
            }
        }
    }


    return(
        <>
            <div className="feedback-title">How was it going?</div>
            <form onSubmit={submitFeedbackHandler} className="leave_feedback-form">
                <div className="feedback-item input">
                    <Input 
                        type="textarea"
                        id="feedback"
                        onInput={inputHandler}
                        validations={[VAL_MIN_LENGTH(5)]}
                        initValid={false}
                        initValue={formState.inputs.feedback.value}
                        errorMessage="Write at least 5 charachters"
                        placeholder="Leave a feedback.."
                        clearFlag={props.flag}
                    />
                    <div className="feedback-item_tail"></div>
                    <button type="submit" className="icon-thumb-tack "></button>
                </div>
            </form>
        </>
    )
}

export default LeaveFeedbacks;