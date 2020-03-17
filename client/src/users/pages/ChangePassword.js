import React, { useState, useContext } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import axios from 'axios';

import { useForm } from '../../shared/hooks/useForm';
import Card from '../../shared/components/UI/Card';
import { AuthContext } from '../../shared/context/auth-context';
import Notificator from '../../shared/components/UI/Notificator';
import { api_server_url } from '../../shared/utilities/globalVariables';
import SetNewPass from '../components/SetNewPass';

const ChangePassword = () => {
  const auth = useContext(AuthContext);
  let history = useHistory();
  const [transition, setTransition] = useState(true);
  const [notificationState, setNotificationState] = useState({
    message: 'some message',
    show: false
  });
  const [formState, inputHandler] = useForm(
    {
      password: {
        value: '',
        inputId: null,
        isValid: false
      }
    },
    false
  );

  const submitFormHandler = async (event, props) => {
    event.preventDefault();
    if (formState) {
      console.log(formState);
      const {
        inputs: { password1, password2 }
      } = formState;

      if (password1.value === password2.value) {
        try {
          const res = await axios.post(api_server_url + '/api/auth/update-password', {
            password: password1,
            token: props.match.params.token
          });

          if (res.data.success) {
            history.push({
              pathname: '/redirect',
              state: {
                className: 'p-0 auth alert success-note',
                message: 'Password was changed successfully'
              }
            });
          }
        } catch (e) {
          console.log(e);
          setNotificationState({
            show: true,
            message: 'Incorrect password'
          });
        }
      } else {
        setNotificationState({
          show: true,
          message: 'Wrong password! Try again.'
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
        <SetNewPass submitFormHandler={submitFormHandler} inputHandler={inputHandler} />
      </Card>
    </>
  );
};

export default withRouter(ChangePassword);
