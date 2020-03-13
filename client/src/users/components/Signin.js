import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import { VAL_EMAIL, VAL_REQUIRED } from '../../shared/utilities/validation';
import { NavLink } from 'react-router-dom';

const Signin = props => {
  return (
    <>
      <h2 className="text-center">Sign In</h2>
      <form onSubmit={props.submitFormHandler}>
        <Input
          id="email"
          type="input"
          label="Email"
          validations={[VAL_EMAIL()]}
          onInput={props.inputHandler}
          errorMessage="Input a valid email"
        />
        <Input
          id="password"
          type="password"
          label="Password"
          validations={[VAL_REQUIRED()]}
          onInput={props.inputHandler}
          errorMessage="Password is required"
        />
        <NavLink to={'/password_reset'} className="forgot-link d-flex align  justify-content-end">
          Forgot password?
        </NavLink>
        <button className="my__button float-right mt-4" type="submit">
          Sign In
        </button>
      </form>
      <button className="my__button mb-4 mt-4" onClick={props.signInUpHandler}>
        Switch to Sign Up
      </button>
    </>
  );
};

export default Signin;
