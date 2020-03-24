import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo
} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import MySlider from '../../shared/components/UI/MySlider';
import EventGalleryItem from './EventCalleryItem';
import Modal from '../../shared/components/UI/Modal';
import { api_server_url } from '../../shared/utilities/globalVariables';
import { AuthContext } from '../../shared/context/auth-context';

import './EventGallery.css';

const EventGallery = () => {
  const accessToken = useContext(AuthContext).token;
  const eventId = useParams().eventId;
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ title: '' });
  const headers = useMemo(
    () => ({
      Authorization: 'Bearer ' + accessToken
    }),
    [accessToken]
  );

  const getGallery = useCallback(async () => {
    const res = await axios.get(
      api_server_url + `/api/events/${eventId}/gallery`,
      {
        headers
      }
    );
    if (res.status === 200) {
      setImages(res.data);
    }
  }, []);

  const onCloseModal = e => {
    setShowModal(false);
  };

  useEffect(() => {
    getGallery();
  }, [getGallery]);

  const onClickHandler = data => {
    let isLeftArrow, isRightArrow;
    data.index === 0 ? (isLeftArrow = false) : (isLeftArrow = true);
    data.index === images.length - 1
      ? (isRightArrow = false)
      : (isRightArrow = true);
    setModalData({
      ...modalData,
      index: data.index,
      img_url: data.img_url,
      description: data.description,
      isLeftArrow: isLeftArrow,
      isRightArrow: isRightArrow
    });
    setShowModal(true);
  };

  const clickArrow = (step, index) => {
    onClickHandler({ ...images[index + step], index: index + step });
  };

  return (
    <>
      <Modal
        showModal={showModal}
        onClose={e => onCloseModal(e)}
        title={modalData.title}
      >
        <div className="event-gallery__modal-children-group">
          <img src={modalData.img_url} alt={modalData.img_url} width={'80%'} />
          <div className="event-gallery__modal-children-desc">
            {modalData.description}
          </div>
        </div>
        {modalData.isLeftArrow ? (
          <span
            className="event-gallery__modal-children-left-arrow"
            onClick={() => clickArrow(-1, modalData.index)}
          >
            {' '}
            &lt;
          </span>
        ) : null}
        {modalData.isRightArrow ? (
          <span
            className="event-gallery__modal-children-right-arrow"
            onClick={() => clickArrow(+1, modalData.index)}
          >
            {' '}
            &gt;
          </span>
        ) : null}
      </Modal>
      {images.length > 0 ? (
        <div>
          <h2>Gallery</h2>

          <MySlider
            slidesToShow={images.length < 3 ? images.length : 3}
            slidesToScroll={images.length < 3 ? images.length : 3}
            dots={true}
          >
            {images.map((image, index) => (
              <EventGalleryItem
                key={index}
                index={index}
                img_url={image.img_url}
                description={image.description}
                className="list__images-item card image_slider-item"
                onClick={onClickHandler}
              />
            ))}
          </MySlider>
        </div>
      ) : null}{' '}
    </>
  );
};
export default EventGallery;
