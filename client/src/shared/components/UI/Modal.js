import React from 'react';

import './Modal.css';

const Modal = props => {
  return (
    <>
      {props.showModal ? (
        <div className="modal fade show" onClick={e => props.onClose(e)}>
          <div
            className="modal-dialog modal-lg"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{props.title}</h5>
                <span className="modal-button" onClick={e => props.onClose(e)}>
                  &times;{' '}
                </span>
              </div>
              <div className="modal-body">{props.children}</div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Modal;
