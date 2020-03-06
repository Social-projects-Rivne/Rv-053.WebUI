import React, { useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

const EditAvatar = ({ refAvatar, user: { avatar } }) => {
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
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-5 col-xl-4">
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
          </div>
          <div className="col-md-6 col-lg-7 col-xl-8">
            <div className="row">
              <div className="col-md-4 col-lg-3 col-xl-2">New File:</div>
              <div className="col-lg-9 col-xl-10">
                <input name="newImage" type="file" onChange={e => handleNewImage(e)} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-lg-3 col-xl-2">Zoom:</div>
              <div className="col-lg-9 col-xl-10">
                <input
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
            </div>
            <div className="row">
              <div className="col-md-4 col-lg-3 col-xl-2"> Rotate:</div>
              <div className="col-lg-9 col-xl-10">
                <button onClick={e => rotateLeft(e)} disabled={state.image ? false : true}>
                  &#8630;
                </button>
                &nbsp;
                <button onClick={e => rotateRight(e)} disabled={state.image ? false : true}>
                  &#8631;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditAvatar;
