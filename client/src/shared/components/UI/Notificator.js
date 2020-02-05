import React from 'react';
import Card from './Card';
import { useHistory } from 'react-router-dom';

const Notificator = props => {
  let history = useHistory();
  const goHome = () => {
    history.push('/');
  };
  return (
    <Card className={'shadow ' + (props.className || props.location.state.className)}>
      <p className="text-left d-inline-block m-0">
        {props.message || props.location.state.message}
      </p>
      <button type="button" className="close" aria-label="Close" onClick={props.onExit || goHome}>
        <span aria-hidden="true">&times;</span>
      </button>
    </Card>
  );
};

export default Notificator;
