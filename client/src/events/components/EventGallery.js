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
import { api_server_url } from '../../shared/utilities/globalVariables';
import { AuthContext } from '../../shared/context/auth-context';

import './EventGallery.css';

const EventGallery = () => {
  const accessToken = useContext(AuthContext).token;
  const eventId = useParams().eventId;
  const [images, setImages] = useState([]);
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

  useEffect(() => {
    getGallery();
  }, [getGallery]);
  const onClickHandler = e => {
    e.preventDefault();
    //TODO: add modal with gallery
  };
  return (
    <>
      {images.length > 0 ? (
        <div>
          <h2>Gallery</h2>

          <MySlider
            slidesToShow={images.length < 3 ? images.length : 3}
            slidesToScroll={images.length < 3 ? images.length : 3}
            dots={true}
          >
            {images.map(image => (
              <EventGalleryItem
                key={image.id}
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
