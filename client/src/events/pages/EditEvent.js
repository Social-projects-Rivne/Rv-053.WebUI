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
    Authorization: 'Bearer ' + accessToken
  };
  const [notificationState, setNotificationState] = useState({
    message: 'some message',
    show: false
  });
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
          price: formState.inputs.price.value ? formState.inputs.price.value + ' UAH' : ''
        };
        const res = await axios.put(api_server_url + '/api/events/' + eventID, updatedEventData, {
          headers
        });

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
          />
        ) : null}
      </Card>
    </>
  );
};

export default EditEvent;
