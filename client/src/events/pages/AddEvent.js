import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Selector from '../../shared/components/FormElements/Select';
import Datepicker from '../../shared/components/FormElements/Datepicker';
import { useForm } from '../../shared/hooks/useForm';
import ImageUpload from '../components/ImageUpload';
import { AuthContext } from '../../shared/context/auth-context';

import { api_server_url } from '../../shared/utilities/globalVariables';

import './AddEvent.css';
import { VAL_MIN_LENGTH, VAL_REQUIRED } from '../../shared/utilities/validation';

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
        console.log(createEventData);
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
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="create__tittle">Create event</h2>
      <form
        onSubmit={submitFormHandler}
        className="col-md-10 offset-md-1"
        encType="multipart/form-data"
      >
        <div className="form-group">
          <Input
            id="title"
            type="input"
            label="Tittle"
            validations={[VAL_REQUIRED()]}
            onInput={inputHandler}
            errorMessage="The field is required"
            className="form-control"
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <Selector
              type="select"
              id="category"
              label="Category"
              onInput={inputHandler}
              validations={[VAL_REQUIRED()]}
              errorMessage="The field is required"
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <Datepicker
              type="select"
              id="date"
              label="Date"
              onInput={inputHandler}
              validations={[VAL_REQUIRED()]}
              errorMessage="The field is required"
              className="form-control"
            />
          </div>
        </div>
        <Input
          id="description"
          type="textarea"
          label="Description"
          onInput={inputHandler}
          validations={[VAL_MIN_LENGTH(5)]}
          errorMessage="Write at least 5 characters!"
          className="form-control"
        />
        <ImageUpload name="cover" onGetImg={getImgURL} />
        <div className="row">
          <div className="col-md-6">
            <Input
              className="form-control"
              id="address"
              type="input"
              onInput={inputHandler}
              label="Address"
              validations={[VAL_REQUIRED()]}
              errorMessage="The field is required"
            />
          </div>
          <div className="col-md-6">
            <Input
              className="form-control"
              id="country"
              type="input"
              onInput={inputHandler}
              label="Country"
              validations={[VAL_REQUIRED()]}
              errorMessage="The field is required"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <Input
              id="price"
              type="number"
              label="Price"
              step="1"
              min="0"
              placeholder="0,00 hrn"
              onInput={inputHandler}
              validations={[VAL_REQUIRED()]}
              errorMessage="The field is required"
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <Input
              id="age"
              type="number"
              label="Min age"
              step="1"
              min="0"
              placeholder="18..."
              onInput={inputHandler}
              validations={[VAL_REQUIRED()]}
              errorMessage="The field is required"
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <Input
              id="participants"
              type="number"
              label="Amount of participants"
              step="1"
              min="0"
              placeholder="10"
              onInput={inputHandler}
              validations={[VAL_REQUIRED()]}
              errorMessage="The field is required"
              className="form-control"
            />
          </div>
        </div>

        <div className="row">
          <button className="btn btn-outline-primary create__btn" type="submit">
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
