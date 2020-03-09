import React from 'react';
import ReactDOM from 'react-dom';

import './ConfirmationWindow.css';

const ConfirmationWindow = props => {
  const content = (
    <div className="black" onClick={props.onNo}>
      <div className="confirm-note">
        <div className="confirm-note_message">{props.message}</div>
        <div>
          <button className="confirm-note_btn-yes" onClick={props.onYes}>
            YES
          </button>
          <button className="confirm-note_btn-no" onClick={props.onNo}>
            NO
          </button>
        </div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal'));
};

export default ConfirmationWindow;
