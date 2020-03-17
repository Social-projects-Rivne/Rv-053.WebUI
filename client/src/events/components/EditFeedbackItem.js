import React, {useEffect, useMemo, useContext} from 'react';
import axios from 'axios';

import {useForm} from '../../shared/hooks/useForm';
import {VAL_MIN_LENGTH} from '../../shared/utilities/validation'; 
import {api_server_url} from '../../shared/utilities/globalVariables';
import {AuthContext} from '../../shared/context/auth-context';
import Input from '../../shared/components/FormElements/Input';


const EditFeedbackItem = (props) => {

    const feedbackId = props.feedback.id;

    const accessToken = useContext(AuthContext).token;
    const headers = useMemo(
        () => ({
          Authorization: 'Bearer ' + accessToken
        }),
        [accessToken]
      );
    
    const [formState, inputHandler, setFormState] = useForm({
        feedback: {
            value: '',
            isValid: false  
        }
    })

    useEffect(()=>{
        setFormState(
            {
                feedback:{
                    value: props.feedback.feedback,
                    isValid: true
                }
            }
        )
    },[])
    const submitUpdateFeedback = (event) => {
        event.preventDefault();
        updateFeedback();
    }

    const updateFeedback = async() => {
        try {
            if(formState.formValidity){
                const updatedFeedback = {
                    feedback: formState.inputs.feedback.value
                }
                const res = await axios.put(
                    `${api_server_url}/api/events/feedback/${feedbackId}`,
                    updatedFeedback,
                    {headers}
                )
                console.log(res);
            }
        } catch (err) {
            console.log(err);
        }

    }

    return(
        <form onSubmit={submitUpdateFeedback} className="leave_feedback-form">
            <div className="feedback-item input">
                <Input 
                    type="input"
                    id="feedback"
                    onInput={inputHandler}
                    validations={[VAL_MIN_LENGTH(5)]}
                    initValid={false}
                    initValue={props.feedback.feedback}
                    errorMessage="Write at least 5 charachters"
                />
                <div className="feedback-item_tail"></div>
                <button type="submit" className="icon-thumb-tack "></button>
            </div>
        </form>

    )
}


export default EditFeedbackItem;