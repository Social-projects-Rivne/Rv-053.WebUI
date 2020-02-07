import React, { useState, useContext } from 'react';
import axios from 'axios';

import Card from '../../shared/components/UI/Card';
import Input from '../../shared/components/FormElements/Input';
import { useForm } from './../../shared/hooks/useForm.js';
// import Select from '../../shared/components/FormElements/Select'
import {
  VAL_EMAIL,
  VAL_REQUIRED,
  VAL_MIN_LENGTH,
  VAL_LETTERS,
  VAL_PASSWORD
} from '../../shared/utilities/validation';
import { AuthContext } from '../../shared//context/auth-context';
import './Login.css';
import Notificator from '../../shared/components/UI/Notificator';
import { useHistory } from 'react-router-dom';

const SignUpIn = () => {
  let history = useHistory();
  const auth = useContext(AuthContext);
  const [signInUpState, setSignInUpState] = useState(false);
  const [notificationState, setNotificationState] = useState({
    errMessage: '',
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
      show: false
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
    setSignInUpState(!signInUpState);
  };

  const signGoogleHandler = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/auth/google');
      // console.log(res.data);
      auth.login(res.data.token);
    } catch (e) {
      console.log('incorrect password or email');
    }
  };

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
          const res = await axios.post('http://localhost:5001/api/auth/register', regUser, {
            withCredentials: true
          });
          console.log(res.data);
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
      {' '}
      {notificationState.show ? (
        <Notificator
          className="auth alert alert-danger p-0"
          message={notificationState.message}
          onExit={() => {
            setNotificationState({
              show: false
            });
          }}
        />
      ) : null}
      <Card className="auth shadow px-2">
        <h2 className="text-center"> {signInUpState === true ? 'Registration' : 'Login'} </h2>{' '}
        <form onSubmit={submitFormHandler}>
          <Input
            id="email"
            type="input"
            label="Email"
            validations={[VAL_EMAIL()]}
            onInput={inputHandler}
            errorMessage="Input a valid email"
            className="form-control"
          />
          {!signInUpState ? (
            <Input
              id="password"
              type="password"
              label="Password"
              validations={[VAL_REQUIRED()]}
              onInput={inputHandler}
              errorMessage="Password is required"
              className="form-control"
            />
          ) : null}
          {signInUpState ? (
            <React.Fragment>
              <Input
                id="password"
                type="password"
                label="Password"
                validations={[VAL_PASSWORD()]}
                onInput={inputHandler}
                errorMessage="Password should be at least 6 symbols and contain uppercase, lowercase, numbers"
                className="form-control"
              />
              <Input
                id="firstName"
                type="input"
                label="First name"
                validations={[VAL_MIN_LENGTH(3), VAL_LETTERS()]}
                onInput={inputHandler}
                errorMessage="Input a valid first name"
                className="form-control"
              />
              <Input
                id="lastName"
                type="input"
                label="Last name"
                validations={[VAL_MIN_LENGTH(2), VAL_LETTERS()]}
                onInput={inputHandler}
                errorMessage="Input a valid last name"
                className="form-control"
              />
              <Input
                id="phone"
                type="phone"
                label="Phone"
                validations={[VAL_REQUIRED()]}
                onInput={inputHandler}
                errorMessage="Phone a valid Number"
                className="form-control"
              />
            </React.Fragment>
          ) : null}
          <button className="btn btn-outline-primary float-right" type="submit">
            {signInUpState === true ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <button className="btn btn-outline-primary mb-4" onClick={signInUpHandler}>
          {signInUpState === false ? 'Switch to Sign Up' : 'Switch to Log In'}
        </button>
        <div className="mb-4" style={{ width: '100%' }}>
          <div
            className="mt-3 d-inline-block float-left"
            style={{
              width: '45%',
              borderTop: '1px solid #999',
              borderBottom: '1px solid #999'
            }}
          ></div>
          <p className="d-inline-block text-center mb-0" style={{ width: '10%' }}>
            OR
          </p>
          <div
            className="mt-3 d-inline-block float-right"
            style={{
              width: '45%',
              borderTop: '1px solid #999',
              borderBottom: '1px solid #999'
            }}
          ></div>
        </div>
        <div className="text-center" style={{ width: '100%' }}>
          <button onClick={signGoogleHandler} className="btn btn-outline-secondary btl-lg mx-auto">
            Sign in with Google
          </button>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default SignUpIn;
