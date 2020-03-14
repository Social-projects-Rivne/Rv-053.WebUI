import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo
} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

//import MySlider from '../../../shared/components/UI/MySlider';
//import EventResultItem from './../../../events/pages/EventResultItem';
import { api_server_url } from '../../shared/utilities/globalVariables';
import { AuthContext } from '../../shared/context/auth-context';

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
    setImages(res.data);
  }, [headers]);

  useEffect(() => {
    if (accessToken) {
      getGallery();
    }
  }, [accessToken, getGallery]);

  return (
    <>
      {images.length > 0 ? (
        <div>
          <h2>Gallery</h2>
          {images.map(image => (
            <img src={image.img_url} alt="" width="100px" />
          ))}
        </div>
      ) : null}{' '}
    </>
  );
};
export default EventGallery;
