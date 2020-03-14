import React, { useState } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Selector from '../../shared/components/FormElements/Select';
import Datepicker from '../../shared/components/FormElements/Datepicker';
import ImageUpload from './ImageUpload';
import {
  VAL_MIN_LENGTH,
  VAL_REQUIRED
} from '../../shared/utilities/validation';
import AutocompletePlaces from '../../shared/components/FormElements/AutocompletePlaces';
import Map from '../../shared/components/UI/Map';
import './EditEventForm.css';

const EditEventForm = props => {
  const [editRoleFlag, setEditRoleFlag] = useState(true);

  function renderMap() {
    let coord = props.coordinates;
    if (coord.lat == null && coord.lng == null) {
      return <div></div>;
    } else {
      return (
        <div className='row'>
          <div className='col-md-12 map-container'>
            <Map center={coord} zoom={16} />
          </div>
        </div>
      );
    }
  }
  return (
    <form
      onSubmit={props.onSubmitFormHandler}
      className='col-md-10 offset-md-1'
      encType='multipart/form-data'
    >
      <div className='form-group'>
        <Input
          id='title'
          type='input'
          label='Tittle'
          validations={[VAL_REQUIRED()]}
          onInput={props.onInputHandler}
          errorMessage='The field is required'
          className='form-control'
        />
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <Selector
            triger={editRoleFlag}
            items={[
              { icon: '', title: 'Admin', info: '' },
              { icon: '', title: 'Moderator', info: '' },
              { icon: '', title: 'User', info: '' }
            ]}
            className=''
          />
        </div>
        <div className='col-md-6'>
          <Datepicker
            type='select'
            id='date'
            label='Date'
            onInput={props.onInputHandler}
            validations={[VAL_REQUIRED()]}
            errorMessage='The field is required'
            className='form-control'
          />
        </div>
      </div>
      <Input
        id='description'
        type='textarea'
        label='Description'
        onInput={props.onInputHandler}
        validations={[VAL_MIN_LENGTH(5)]}
        errorMessage='Write at least 5 characters!'
        className='form-control'
      />
      <ImageUpload name='cover' onGetImg={props.imageUpload} />
      <div className='row'>
        <AutocompletePlaces
          className='col-md-6'
          setCoordinates={props.setCoordinates}
        />
      </div>
      {renderMap()}
      <div className='row'>
        <div className='col-md-4'>
          <Input
            id='price'
            type='number'
            label='Price'
            step='1'
            min='0'
            placeholder='0,00 hrn'
            onInput={props.onInputHandler}
            validations={[VAL_REQUIRED()]}
            errorMessage='The field is required'
            className='form-control'
          />
        </div>
        <div className='col-md-4'>
          <Input
            id='age'
            type='number'
            label='Min age'
            step='1'
            min='0'
            placeholder='18...'
            onInput={props.onInputHandler}
            validations={[VAL_REQUIRED()]}
            errorMessage='The field is required'
            className='form-control'
          />
        </div>
        <div className='col-md-4'>
          <Input
            id='participants'
            type='number'
            label='Amount of participants'
            step='1'
            min='0'
            placeholder='10'
            onInput={props.onInputHandler}
            validations={[VAL_REQUIRED()]}
            errorMessage='The field is required'
            className='form-control'
          />
        </div>
      </div>

      <div className='row'>
        <button className='btn btn-outline-primary create__btn' type='submit'>
          Add Event
        </button>
      </div>
    </form>
  );
};

export default EditEventForm;
