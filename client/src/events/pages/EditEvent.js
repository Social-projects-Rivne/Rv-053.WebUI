import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

import EditEventForm from '../components/EditEventForm';
import Card from '../../shared/components/UI/Card';
import { useForm } from '../../shared/hooks/useForm';
import { api_server_url } from '../../shared/utilities/globalVariables';
import { AuthContext } from '../../shared/context/auth-context';
import Notificator from '../../shared/components/UI/Notificator';
import ScrollToTop from '../../shared/components/UI/ScrollToTop';

const EditEvent = () => {
  const history = useHistory();
  const accessToken = useContext(AuthContext).token;
  const headers = {
    Authorization: 'Bearer ' + accessToken,
    'Content-Type': 'multipart/form-data'
  };
  const [notificationState, setNotificationState] = useState({
    message: 'some message',
    show: false
  });
  const [galleryState, setGalleryState] = useState([]);
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: true
      },
      select: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      location: {
        value: '',
        isValid: false
      },
      price: {
        value: '',
        isValid: false
      },
      age: {
        value: '',
        isValid: false
      },
      amount: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const [loadingFlag, setLoadingFlag] = useState(true);

  const eventID = useParams().id;

  const fetchEventData = useCallback(async () => {
    try {
      setLoadingFlag(true);
      const res = await axios.get(api_server_url + '/api/events/' + eventID);
      setFormData(
        {
          title: {
            value: res.data.name,
            isValid: true
          },
          description: {
            value: res.data.description,
            isValid: true
          },
          price: {
            value: res.data.price,
            isValid: true
          },
          age: {
            value: res.data.min_age,
            isValid: true
          },
          amount: {
            value: res.data.max_participants,
            isValid: true
          },
          cover: {
            value: res.data.cover,
            isValid: true
          },
          duration: {
            value: res.data.duration,
            isValid: true
          },
          location: {
            value: res.data.location,
            isValid: true
          },
          datetime: {
            value: res.data.datetime,
            isValid: true
          }
        },
        true
      );

      const resGallery = await axios.get(
        api_server_url + '/api/events/' + eventID + '/gallery'
      );
      setGalleryState(resGallery.data);
      setLoadingFlag(false);
    } catch (e) {
      console.log(e);
    }
  }, [eventID, setFormData]);

  const updateEventData = async () => {
    if (formState.formValidity) {
      try {
        let updatedEventData = new FormData();
        updatedEventData.append('name', formState.inputs.title.value);
        updatedEventData.append(
          'description',
          formState.inputs.description.value
        );
        updatedEventData.append('location', formState.inputs.location.value);
        updatedEventData.append('datetime', formState.inputs.datetime.value);
        updatedEventData.append('duration', formState.inputs.duration.value);
        updatedEventData.append(
          'max_participants',
          formState.inputs.amount.value
        );
        updatedEventData.append('min_age', formState.inputs.age.value);
        updatedEventData.append('cover', formState.inputs.cover.value);
        updatedEventData.append('price', formState.inputs.price.value);
        console.log(...updatedEventData);
        const res = await axios.put(
          api_server_url + '/api/events/' + eventID,
          updatedEventData,
          {
            headers
          }
        );

        if (res.status === 200) {
          history.push({
            pathname: '/redirect',
            state: {
              className: 'p-0 auth alert success-note',
              message: res.data.status
            }
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    fetchEventData();
  }, [fetchEventData]);

  const submitFormHandler = event => {
    event.preventDefault();
    updateEventData();
  };
  const editImageHandler = image => {
    alert('edit');
  };
  const deleteImageHandler = image => {
    image.isDeleted = true;
    setGalleryState([...galleryState, image]);
  };
  return (
    <>
      <ScrollToTop />
      <Notificator
        className="success-note"
        message={notificationState.message}
        show={notificationState.show}
        onExit={() => {
          setNotificationState({
            show: false,
            message: notificationState.message
          });
        }}
      />
      <Card className="addEvent">
        <h2>Edit event</h2>
        {!loadingFlag ? (
          <EditEventForm
            onInputHandler={inputHandler}
            onSubmitFormHandler={submitFormHandler}
            eventData={formState.inputs}
            galleryData={galleryState}
            editImageHandler={editImageHandler}
            deleteImageHandler={deleteImageHandler}
          />
        ) : null}
      </Card>
    </>
  );
};

export default EditEvent;
