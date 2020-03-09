import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { useForm } from '../../shared/hooks/useForm';
import { AuthContext } from '../../shared/context/auth-context';
import ScrollToTop from '../..//shared/components/UI/ScrollToTop';
import AddEventForm from '../components/AddEventForm';
import { api_server_url } from '../../shared/utilities/globalVariables';
import './AddEvent.css';

const AddEvent = () => {
  const history = useHistory();
  const accessToken = useContext(AuthContext).token;
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + accessToken
  };

  const [notificationState, setNotificationState] = useState({
    message: 'some message',
    show: false
  });

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      category: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      },
      country: {
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
      participants: {
        value: '',
        isValid: false
      },
      date: {
        value: '',
        isValid: false
      }
    },
    false
  );

  let imgObject;
  const getImgURL = file => (imgObject = file);

  const submitFormHandler = async event => {
    event.preventDefault();
    if (formState.formValidity) {
      try {
        const createEventData = new FormData();
        createEventData.append('name', formState.inputs.title.value);
        createEventData.append('category', formState.inputs.category.value);
        createEventData.append('description', formState.inputs.description.value);
        createEventData.append(
          'location',
          `${formState.inputs.address.value}, ${formState.inputs.country.value}`
        );
        createEventData.append('datetime', formState.inputs.date.value);
        createEventData.append('max_participants', formState.inputs.participants.value);
        createEventData.append('min_age', formState.inputs.age.value);
        createEventData.append('price', formState.inputs.age.value);
        createEventData.append('cover', imgObject);
        const res = await axios.post(api_server_url + '/api/events', createEventData, {
          headers
        });
        if (res.status === 200) {
          setNotificationState({
            message: res.data.status,
            show: true
          });
          history.push({
            pathname: '/redirect',
            state: {
              className: 'p-0 auth alert alert-success',
              message: res.data.status
            }
          });
        } else {
          console.log('stupid errorr');
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <>
      <ScrollToTop />
      <div className="container">
        <h2 className="create__tittle">Create event</h2>
        <AddEventForm
          onInputHandler={inputHandler}
          onSubmitFormHandler={submitFormHandler}
          imageUpload={getImgURL}
        />
      </div>
    </>
  );
};

export default AddEvent;
