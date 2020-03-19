import React, { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import './EditAvatarForm.css';

const EditAvatar = ({ refAvatar, user: { avatar } }) => {
  const fileInputRef = useRef(null);
  const [state, setStateImg] = useState({
    image: avatar,
    allowZoomOut: false,
    scale: 1,
    rotate: 0,
    borderRadius: 0,
    width: 250,
    height: 250,
    position: { x: 0.5, y: 0.5 }
  });

  const handleNewImage = e => {
    setStateImg({ ...state, image: e.target.files[0] });
  };
  const handleScale = e => {
    const newScale = +e.target.value;
    setStateImg({ ...state, scale: newScale });
  };
  const rotateLeft = e => {
    e.preventDefault();
    setStateImg({
      ...state,
      rotate: state.rotate - 90
    });
  };

  const rotateRight = e => {
    e.preventDefault();
    setStateImg({
      ...state,
      rotate: state.rotate + 90
    });
  };

  return (
    <div className="div-avatar-container">
      <div className="div-change-avatar">
        {state.image ? (
          <AvatarEditor
            width={state.width}
            height={state.height}
            image={state.image}
            scale={state.scale}
            borderRadius={state.width}
            border={5}
            rotate={parseFloat(state.rotate)}
            ref={refAvatar}
            crossOrigin="anonymous"
          />
        ) : (
          <div
            style={{
              width: state.width + 10 + 'px',
              height: state.height + 10 + 'px',
              border: '3px solid rgba(96, 98, 110, 0.5)'
            }}
          ></div>
        )}
        <span
          className="change-avatar-btn"
          onClick={() =>
            fileInputRef.current !== null ? fileInputRef.current.click() : null
          }
        >
          Change avatar
        </span>
      </div>
      <div className="div-avatar-inputs">
        <div>
          <input
            id="file"
            name="newImage"
            type="file"
            onChange={e => handleNewImage(e)}
            ref={fileInputRef}
            className="inputfile"
            accept="image/*"
          />
          <label htmlFor="file">Chose New Image</label>
        </div>
        <div>
          <label htmlFor="zoom">Zoom:</label>
          <input
            id="zoom"
            name="scale"
            type="range"
            onChange={e => handleScale(e)}
            min="1"
            max="3"
            step="0.01"
            defaultValue="1"
            disabled={state.image ? false : true}
          />
        </div>
        <div>
          <label> Rotate:</label>
          <button
            onClick={e => rotateLeft(e)}
            disabled={state.image ? false : true}
          >
            &#8630;
          </button>
          &nbsp;
          <button
            onClick={e => rotateRight(e)}
            disabled={state.image ? false : true}
          >
            &#8631;
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditAvatar;
