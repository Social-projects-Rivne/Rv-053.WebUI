import React from 'react';

import './SuccessNote.css';
import { parseWithOptions } from 'date-fns/fp';

const SuccessNote = props => {
  return (
    <div className="note__wrapper">
      <span>Profile updated!</span>
      <button className="close_note" onClick={props.click}></button>
    </div>
  );
};

export default SuccessNote;
