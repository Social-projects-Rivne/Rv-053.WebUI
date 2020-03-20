import React, { useState, useRef, useCallback } from 'react';
import Input from '../../shared/components/FormElements/Input';
const EditImage = props => {
  const imageInputRef = useRef(null);
  const [state, setStateImg] = useState({
    img_url: props.img_url,
    description: props.description
  });
  const handleNewImage = e => {
    setStateImg({ ...state, img_url: e.target.files[0] });
  };
  return (
    <form>
      {console.log(state)}
      <div className="list__events-item-img edit-event__change-cover-container">
        <img
          src={
            typeof state.img_url === 'object'
              ? URL.createObjectURL(state.img_url)
              : state.img_url
          }
          alt={state.img_url}
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
      />
      <input
        name="description"
        type="text"
        placeholder={props.placeholder}
        defaultValue={props.description}
      />
    </form>
  );
};

export default EditImage;
