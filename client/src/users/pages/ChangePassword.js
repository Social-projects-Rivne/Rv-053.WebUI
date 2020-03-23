import React, { useState, useContext } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import axios from 'axios';

import { useForm } from '../../shared/hooks/useForm';
import Card from '../../shared/components/UI/Card';
import { AuthContext } from '../../shared/context/auth-context';
import Notificator from '../../shared/components/UI/Notificator';
import { api_server_url } from '../../shared/utilities/globalVariables';
import SetNewPassword from '../components/SetNewPassword';

const ChangePassword = props => {
  const auth = useContext(AuthContext);
  let history = useHistory();
  const [notificationState, setNotificationState] = useState({
    message: 'some message',
    show: false
  });

  const [formState, inputHandler] = useForm(
    {
      password1: {
        value: '',
        inputId: null,
        isValid: false
      },
      password2: {
        value: '',
        inputId: null,
        isValid: false
      }
    },
    false
  );

  const submitFormHandler = async event => {
    event.preventDefault();
    if (formState) {
      const {
        inputs: { password1, password2 },
        formValidity
      } = formState;

      if (!formValidity) {
        return;
      }

      if (password1.value === password2.value) {
        try {
          const res = await axios.put(api_server_url + '/api/auth/password-update', {
            password: password1,
            token: props.match.params.token
          });
          if (res.status === 200) {
            history.push({
              pathname: '/redirect',
              state: {
                className: 'p-0 auth alert success-note',
                message: 'Password was changed successfuly.',
                redirectTo: '/auth'
              }
            });
          }
        } catch {
          setNotificationState({
            show: true,
            message: 'Incorrect password'
          });
        }
      } else {
        setNotificationState({
          show: true,
          message: 'Password does not match.'
        });
      }
    }
  };

  return (
    <>
      <Notificator
        className="auth alert alert-danger p-0"
        message={notificationState.message}
        show={notificationState.show}
        onExit={() => {
          setNotificationState({
            show: false,
            message: notificationState.message
          });
        }}
      />
      <Card className="auth shadow px-2 text-center">
        <SetNewPassword submitFormHandler={submitFormHandler} inputHandler={inputHandler} />
      </Card>
    </>
  );
};

export default withRouter(ChangePassword);
