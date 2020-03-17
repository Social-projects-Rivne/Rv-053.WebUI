import React from 'react';

import EventGalleryItem from './EventCalleryItem';

import './EventGallery.css';

const EditGalleryForm = props => {
  return (
    <div>
      {props.galleryData.length > 0 ? (
        <div className="list__images">
          <h2>Gallery</h2>
          {props.galleryData.map(image =>
            !image.isDeleted ? (
              <div className="list__images-item-wrapper">
                <EventGalleryItem
                  key={image.id}
                  image={image.img_url}
                  description={image.description}
                  className="list__images-item card image_slider-item"
                  // onClick={onClickHandler}
                />
                <div className="list__events-item-panel">
                  <span
                    className="button-link icon-pencil link"
                    onClick={() => {
                      props.editImageHandler(image);
                    }}
                  ></span>
                  <span
                    className="button-link icon-trash"
                    onClick={() => {
                      props.deleteImageHandler(image);
                    }}
                  ></span>
                </div>
              </div>
            ) : null
          )}
        </div>
      ) : null}{' '}
    </div>
  );
};
export default EditGalleryForm;
