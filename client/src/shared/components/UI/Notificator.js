import React, { useState, useEffect } from 'react';
import { useHistory, withRouter, Redirect } from 'react-router-dom';

import Card from './Card';
import RollingAnimation from '../UI/Animations/RollingAnimation';

const Notificator = props => {
  let history = useHistory();
  const [animationTriger, setAnimationTriger] = useState(false);

  const goHome = () => {
    setAnimationTriger(false);
    setTimeout(() => {
      history.push('/');
    }, 500);
  };

  useEffect(() => {
    if (props.show === undefined) {
      setAnimationTriger(true);
    }
  }, []);

  return (
    <>
      {props.location.state || (props.className && props.message) ? (
        <RollingAnimation triger={props.show || animationTriger} mountOnEnter unmountOnExit>
          <Card
            className={'shadow p-0 auth ' + (props.className || props.location.state.className)}
          >
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
        </RollingAnimation>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default withRouter(Notificator);
