import React from 'react';
import Card from './Card';

const Notificator = props => {
  return (
    <Card className={'shadow ' + props.className}>
      <p className="text-left d-inline-block m-0">{props.message}</p>
      <button type="button" className="close" aria-label="Close" onClick={props.onExit}>
        <span aria-hidden="true">&times;</span>
      </button>
    </Card>
  );
};

export default Notificator;
