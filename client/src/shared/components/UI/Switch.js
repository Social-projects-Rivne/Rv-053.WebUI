import React, { useState } from 'react';

import './Switch.css';

const Switch = props => {
  const [checkboxState, setCheckboxState] = useState(props.initSwitch || false);
  const checkboxHandler = event => {
    setCheckboxState(!checkboxState);
    if (!props.onSwitch) {
      return;
    }
    props.onSwitch(event.target.checked);
  };
  return (
    <div className="onoffswitch">
      <input
        type="checkbox"
        name="onoffswitch"
        className="onoffswitch-checkbox"
        id={props.id}
        onChange={checkboxHandler}
        checked={checkboxState}
      />
      <label className="onoffswitch-label" htmlFor={props.id}>
        <div className="onoffswitch-inner">
          <span className="onoffswitch-inner-left">{props.titleOn}</span>
          <span className="onoffswitch-inner-right">{props.titleOff}</span>
        </div>
        <span className="onoffswitch-switch"></span>
      </label>
    </div>
  );
};

export default Switch;
