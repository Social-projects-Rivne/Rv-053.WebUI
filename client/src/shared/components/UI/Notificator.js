import React from 'react';
import Card from './Card';
import { useHistory, withRouter, Redirect } from 'react-router-dom';

const Notificator = props => {
  let history = useHistory();
  const goHome = () => {
    history.push('/');
  };

  return (
    <>
      {props.location.state || (props.className && props.message) ? (
        <Card className={'shadow p-0 auth ' + (props.className || props.location.state.className)}>
          <p className="text-left d-inline-block m-0">
            {props.message || props.location.state.message}
          </p>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={props.onExit || goHome}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Card>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default withRouter(Notificator);
