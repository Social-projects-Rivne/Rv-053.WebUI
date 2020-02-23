import React, { useState, useContext } from 'react';
import axios from 'axios';

import { useForm } from '../../shared/hooks/useForm.js';
import Card from '../../shared/components/UI/Card';
import { AuthContext } from '../../shared/context/auth-context';
import './Login.css';
import Notificator from '../../shared/components/UI/Notificator';
import { useHistory } from 'react-router-dom';
import Signin from '../components/Signin';
import Signup from '../components/Signup.js';
import DisappearingAnimation from '../../shared/components/UI/Animations/DisappearingAnimation.js';

const SignUpIn = () => {
  let history = useHistory();
  const auth = useContext(AuthContext);
  const [transition, setTransition] = useState(true);
  const [signInUpState, setSignInUpState] = useState(false);
  const [notificationState, setNotificationState] = useState({
    message: 'some message',
    show: false
  });
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const signInUpHandler = () => {
    setNotificationState({
      show: false,
      message: notificationState.message
    });
    if (signInUpState) {
      setFormData(
        {
          ...formState.inputs,
          firstName: undefined,
          lastName: undefined,
          phone: undefined
        },
        formState.formValidity
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          firstName: {
            value: '',
            isValid: false
          },
          lastName: {
            value: '',
            isValid: false
          },
          phone: {
            value: '',
            isValid: false
          }
        },
        formState.formValidity
      );
    }
    setTimeout(() => {
      setSignInUpState(!signInUpState);
    }, 320);
    setTransition(false);
    setTimeout(() => {
      setTransition(true);
    }, 320);
  };

  // const signGoogleHandler = async () => {
  //   try {
  //     const res = await axios.get('http://localhost:5001/api/auth/google');
  //     // console.log(res.data);
  //     auth.login(res.data.token);
  //   } catch (e) {
  //     console.log('incorrect password or email');
  //   }
  // };

  const submitFormHandler = async event => {
    event.preventDefault();

    if (formState.formValidity) {
      const user = {
        email: formState.inputs.email.value,
        password: formState.inputs.password.value
      };
      if (!signInUpState) {
        try {
          const res = await axios.post('http://localhost:5001/api/auth/login', user, {
            withCredentials: true
          });
          auth.login(res.data.token, res.data.expiresIn);
        } catch (e) {
          console.log('incorrect password or email');
          setNotificationState({
            show: true,
            message: 'Incorrect password or email'
          });
        }
      } else {
        const regUser = {
          ...user,
          first_name: formState.inputs.firstName.value,
          last_name: formState.inputs.lastName.value,
          phone: formState.inputs.phone.value
        };
        try {
          const res = await axios.post('http://localhost:5001/api/auth/register', regUser);
          if (res.data.error) {
            setNotificationState({
              show: true,
              message: res.data.error
            });
          }
          if (res.data.success) {
            history.push({
              pathname: '/redirect',
              state: {
                className: 'p-0 auth alert alert-success',
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
    }
  };

  return (
    <React.Fragment>
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

      <DisappearingAnimation triger={transition} timeout="320">
        {!signInUpState ? (
          <Card className="auth shadow px-2">
            <Signin
              signInUpHandler={signInUpHandler}
              inputHandler={inputHandler}
              submitFormHandler={submitFormHandler}
            />
          </Card>
        ) : (
          <Card className="auth shadow px-2">
            <Signup
              signInUpHandler={signInUpHandler}
              inputHandler={inputHandler}
              submitFormHandler={submitFormHandler}
            />
          </Card>
        )}
      </DisappearingAnimation>
    </React.Fragment>
  );
};

export default SignUpIn;
