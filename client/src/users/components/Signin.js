import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from './../../shared/components/UI/Button';
import { VAL_EMAIL, VAL_REQUIRED } from '../../shared/utilities/validation';

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
          className="form-control"
        />
        <Input
          id="password"
          type="password"
          label="Password"
          validations={[VAL_REQUIRED()]}
          onInput={props.inputHandler}
          errorMessage="Password is required"
          className="form-control"
        />
        <div className="btn-container">
          <Button onClick={props.signInUpHandler}>Switch to Sign Up</Button>
          <Button type="submit">Sign In</Button>{' '}
        </div>
      </form>
    </>
  );
};

export default Signin;
