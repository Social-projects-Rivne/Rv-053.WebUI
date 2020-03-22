import React, { useState, useRef } from 'react';
const EditImage = props => {
  const imageInputRef = useRef(null);
  const [state, setStateImg] = useState({
    id: props.id,
    img_url: props.img_url,
    description: props.description,
    is_new: props.is_new,
    is_changed: props.is_changed,
    is_deleted: props.is_deleted
  });
  const handleNewImage = e => {
    setStateImg({ ...state, img_url: e.target.files[0] });
  };
  const handleNewDescription = e => {
    setStateImg({ ...state, description: e.target.value });
  };
  const ClassInputFull = state.description ? 'input-full' : null;
  return (
    <div style={{ margin: '0 25px' }}>
      <div className="list__images-item-img edit-image__change-cover-container">
        <img
          src={
            typeof state.img_url === 'object'
              ? URL.createObjectURL(state.img_url)
              : state.img_url
          }
          alt={props.img_url}
          className="list__images-item-img"
        ></img>
        <span
          className="edit-image__change-cover-btn"
          onClick={() =>
            imageInputRef.current !== null
              ? imageInputRef.current.click()
              : null
          }
        >
          change image
        </span>
      </div>

      <input
        name="imageOfGallery"
        type="file"
        ref={imageInputRef}
        onChange={e => handleNewImage(e)}
        accept="image/*"
        className="edit-image-gallery_inputfile"
      />
      <div className="edit-image-gallery_description-group">
        <input
          name="description"
          type="text"
          defaultValue={props.description}
          className="edit-image-gallery_description-input"
          onChange={e => handleNewDescription(e)}
          maxLength="120"
        />
        <label
          htmlFor="description"
          className="edit-image-gallery_description-label"
        >
          <span className={ClassInputFull}>Description: </span>
        </label>
      </div>
      <button
        className="my__button mr-4 mb-4 mt-4 d-inline-block float-left"
        onClick={() => props.onSave(state)}
      >
        Save changes
      </button>
      <button
        className="my__button my__button-red mr-4 mb-4 mt-4 d-inline-block float-right"
        onClick={() => props.onClose()}
      >
        Cancel
      </button>
    </div>
  );
};

export default EditImage;
