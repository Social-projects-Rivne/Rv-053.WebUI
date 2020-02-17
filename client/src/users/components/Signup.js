import React from 'react';

import Card from '../../shared/components/UI/Card';
import Input from '../../shared/components/FormElements/Input';
import {
  VAL_EMAIL,
  VAL_REQUIRED,
  VAL_MIN_LENGTH,
  VAL_LETTERS,
  VAL_PASSWORD
} from '../../shared/utilities/validation';

const Signup = props => {
  return (
    <>
      <h2 className="text-center">Sign Up</h2>{' '}
      <form onSubmit={props.submitFormHandler}>
        <Input
          id="email"
          type="input"
          label="Email"
          validations={[VAL_EMAIL()]}
          onInput={props.inputHandler}
          errorMessage="Input a valid email"
          className="form-control"
        />
        <Input
          id="password"
          type="password"
          label="Password"
          validations={[VAL_PASSWORD()]}
          onInput={props.inputHandler}
          errorMessage="Password must be at least 6 symbols and contain uppercase, lowercase, numbers"
          className="form-control"
        />
        <Input
          id="firstName"
          type="input"
          label="First name"
          validations={[VAL_MIN_LENGTH(3), VAL_LETTERS()]}
          onInput={props.inputHandler}
          errorMessage="Input a valid first name"
          className="form-control"
        />
        <Input
          id="lastName"
          type="input"
          label="Last name"
          validations={[VAL_MIN_LENGTH(2), VAL_LETTERS()]}
          onInput={props.inputHandler}
          errorMessage="Input a valid last name"
          className="form-control"
        />
        <Input
          id="phone"
          type="phone"
          label="Phone"
          validations={[VAL_REQUIRED()]}
          onInput={props.inputHandler}
          errorMessage="Phone a valid Number"
          className="form-control"
        />
        <button className="btn btn-outline-primary float-right" type="submit">
          Sign Up
        </button>
      </form>
      <button className="btn btn-outline-primary mb-4" onClick={props.signInUpHandler}>
        Switch to Sign In
      </button>
    </>
  );
};

export default Signup;
