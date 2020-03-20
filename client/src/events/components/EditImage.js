import React, { useState, useRef, useCallback, useEffect } from 'react';
import Input from '../../shared/components/FormElements/Input';
import { useForm } from '../../shared/hooks/useForm';
const EditImage = props => {
  const imageInputRef = useRef(null);
  const [state, setStateImg] = useState({
    id: props.id,
    img_url: props.img_url,
    description: props.description
  });
  const handleNewImage = e => {
    setStateImg({ ...state, img_url: e.target.files[0] });
  };
  const handleNewDescription = e => {
    setStateImg({ ...state, description: e.target.value });
  };

  return (
    <div>
      <div className="list__events-item-img edit-event__change-cover-container">
        <img
          src={
            typeof state.img_url === 'object'
              ? URL.createObjectURL(state.img_url)
              : state.img_url
          }
          alt={props.img_url}
          className="list__events-item-img"
        ></img>
        <span
          className="edit-event__change-cover-btn"
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
      <div className="edit-image-gallery_description-text-input">
        <label for="description">Description: </label>
        <input
          name="description"
          type="text"
          placeholder={props.placeholder}
          defaultValue={props.description}
          onChange={e => handleNewDescription(e)}
        />
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
