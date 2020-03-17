import React, {useMemo, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import {api_server_url} from '../../shared/utilities/globalVariables';
import {AuthContext} from '../../shared/context/auth-context';
import {useForm} from '../../shared/hooks/useForm';
import {VAL_MIN_LENGTH} from '../../shared/utilities/validation';
import Input from '../../shared/components/FormElements/Input';
import './EventFeedbacks.css'

const LeaveFeedbacks = (props) => {      
    const history = useHistory();  
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
                history.push(`/event/${props.eventId}`, { show: true });
            }   
            catch (err) {
                console.log(err);
            }
        }
    }
    return(
        <>
            <form onSubmit={submitFeedbackHandler} className="leave_feedback-form">
                <div className="feedback-item input">
                    <Input 
                        type="input"
                        id="feedback"
                        onInput={inputHandler}
                        validations={[VAL_MIN_LENGTH(5)]}
                        initValid={false}
                        errorMessage="Write at least 5 charachters"
                    />
                    <div className="feedback-item_tail"></div>
                    <button type="submit" className="icon-thumb-tack "></button>
                </div>
            </form>
        </>
    )
}

export default LeaveFeedbacks;