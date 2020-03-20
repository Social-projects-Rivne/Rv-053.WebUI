import React, { useState } from 'react';

import EventGalleryItem from './EventCalleryItem';
import Modal from '../../shared/components/UI/Modal';
import EditImage from './EditImage';

import './EventGallery.css';

const EditGalleryForm = props => {
  const MAX_IMAGES_OF_GALLERY = 8;
  const [showGallery, setShowGallery] = useState('hide');
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const showGalleryToggle = () => {
    showGallery === 'hide' ? setShowGallery('show') : setShowGallery('hide');
  };
  const countOfImages = arr => {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      if (!arr[i].is_deleted) {
        count++;
      }
    }
    return count;
  };
  const onClickImageHandler = data => {
    setModalData({
      ...modalData,
      id: data.id,
      title: 'Change Image',
      description: data.description,
      img_url: data.img_url
    });
    setShowModal(true);
  };
  const onClickNewImageHandler = () => {
    setModalData({
      ...modalData,
      id: 0,
      title: 'Upload New Image',
      description: '',
      placeholder: 'Enter the description of image',
      img_url: ''
    });
    setShowModal(true);
  };
  const onCloseModal = e => {
    setShowModal(false);
  };
  const onSave = state => {
    setShowModal(false);
    if (state.id === 0) {
      props.createImageHandler(state);
    } else {
      props.changeImageHandler(state);
    }
  };
  return (
    <div>
      <Modal
        showModal={showModal}
        onClose={e => onCloseModal(e)}
        title={modalData.title}
      >
        <EditImage
          id={modalData.id}
          description={modalData.description}
          img_url={modalData.img_url}
          placeholder={modalData.placeholder || ''}
          onClose={e => onCloseModal(e)}
          onSave={e => onSave(e)}
        />
      </Modal>
      <div className="list__images">
        <h3
          className="list__images-arrow-down"
          onClick={() => showGalleryToggle()}
        >
          Edit Gallery <span>⇩</span>{' '}
        </h3>

        <div className={'list__images-container ' + showGallery}>
          {countOfImages(props.galleryData) < MAX_IMAGES_OF_GALLERY ? (
            <div className="list__images-item-wrapper">
              <EventGalleryItem
                key="0"
                img_url=""
                description="Upload New Image"
                className="list__images-item card image_slider-item"
                onClick={onClickNewImageHandler}
                additional={<span className="icon-plus"></span>}
              />
            </div>
          ) : null}
          {props.galleryData.map(image =>
            !image.is_deleted ? (
              <div className="list__images-item-wrapper">
                <EventGalleryItem
                  key={image.id}
                  id={image.id}
                  img_url={image.img_url}
                  description={image.description}
                  className="list__images-item card image_slider-item"
                  onClick={onClickImageHandler}
                  additional={
                    <div className="list__images-item-panel">
                      <span
                        className="button-link icon-pencil link"
                        // onClick={() => {
                        //   props.editImageHandler(image);
                        // }}
                      ></span>
                      <span
                        className="button-link icon-trash"
                        onClick={e => {
                          e.stopPropagation();
                          props.deleteImageHandler(image);
                        }}
                      ></span>
                    </div>
                  }
                />
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};
export default EditGalleryForm;
