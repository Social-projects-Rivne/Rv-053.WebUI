import React from 'react';

import './Modal.css';

const Modal = props => {
  return (
    <>
      {props.showModal ? (
        <div className="modal fade show">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{props.title}</h5>
                <button type="button" onClick={e => props.onClose(e)}>
                  <span>&times;</span>
                </button>
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
