import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import Card from '../../shared/components/UI/Card';
import { useForm } from '../../shared/hooks/useForm';
import { api_server_url } from '../../shared/utilities/globalVariables';
import SendPasswordReset from '../components/SendPasswordReset';

const PasswordReset = () => {
  let history = useHistory();
  const [transition, setTransition] = useState(true);
  const [notificationState, setNotificationState] = useState({
    message: 'some message',
    show: false
  });
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const submitFormHandler = async event => {
    event.preventDefault();
    if (formState.formValidity) {
      const userEmail = {
        email: formState.inputs.email.value
      };

      try {
        const res = await axios.post(api_server_url + '/api/auth/password-reset', userEmail);

        if (res.data.success) {
          history.push({
            pathname: '/redirect',
            state: {
              className: 'p-0 auth alert success-note',
              message: 'Check your email to confirm it'
            }
          });
        }
      } catch (e) {
        console.log(e);
        setNotificationState({
          show: true,
          message: 'Something goes wrong, try again later'
        });
      }
    }
  };

  return (
    <>
      <Card className="auth shadow px-2 text-center">
        <SendPasswordReset submitFormHandler={submitFormHandler} inputHandler={inputHandler} />
      </Card>
    </>
  );
};

export default PasswordReset;
