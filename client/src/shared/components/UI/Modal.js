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
              <div className="modal-footer">
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Modal;
