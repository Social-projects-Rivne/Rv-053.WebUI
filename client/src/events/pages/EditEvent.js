import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

import EditEventForm from '../components/EditEventForm';
import Card from '../../shared/components/UI/Card';
import { useForm } from '../../shared/hooks/useForm';
import { api_server_url } from '../../shared/utilities/globalVariables';
import { AuthContext } from '../../shared/context/auth-context';
import ScrollToTop from '../../shared/components/UI/ScrollToTop';
import objToFormData from '../../shared/utilities/objToFormData';

const EditEvent = props => {
  const history = useHistory();
  const accessToken = useContext(AuthContext).token;
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + accessToken
  };
  const [formState, inputHandler, setFormData] = useForm();

  const [eventCategory, setEventCategory] = useState({ id: null, category: '' });

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
            value: res.data.price.match(/\d+/),
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
      setEventCategory(res.data.categories[0]);
      setLoadingFlag(false);
    } catch (e) {
      console.log(e);
    }
  }, [eventID, setFormData]);
  const updateEventData = async () => {
    if (formState.formValidity) {
      try {
        const updatedEventData = {
          name: formState.inputs.title.value,
          description: formState.inputs.description.value,
          location: formState.inputs.location.value,
          datetime: formState.inputs.datetime.value,
          duration: formState.inputs.duration.value,
          max_participants: formState.inputs.amount.value,
          min_age: formState.inputs.age.value,
          cover: formState.inputs.cover.value,
          price: formState.inputs.price.value ? formState.inputs.price.value + ' UAH' : '',
          category: eventCategory.id
        };
        const updatedEventFormData = objToFormData(updatedEventData);
        const res = await axios.put(
          api_server_url + '/api/events/' + eventID,
          updatedEventFormData,
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

  return (
    <>
      <ScrollToTop />
      <Card className="addEvent">
        <h2>Edit event</h2>
        {!loadingFlag ? (
          <EditEventForm
            onInputHandler={inputHandler}
            onSubmitFormHandler={submitFormHandler}
            eventData={formState.inputs}
            category={eventCategory}
            onChooseCategory={e => setEventCategory({ id: e.id, category: e.title })}
          />
        ) : null}
        <button
          className="my__button my__button-red mr-4 mb-4 mt-4 d-inline-block float-right"
          onClick={history.goBack}
        >
          Cancel
        </button>
      </Card>
    </>
  );
};

export default EditEvent;
