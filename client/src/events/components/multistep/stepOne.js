import React, { useState } from 'react';

import Datetime from 'react-datetime';
import Input from '../../../shared/components/FormElements/Input';
import Selector from '../../../shared/components/FormElements/Select';
import ImageUpload from '../UploadImage';

import {
  VAL_MIN_LENGTH,
  VAL_REQUIRED
} from '../../../shared/utilities/validation';

const StepOne = props => {
  const [dateState, setDateState] = useState({
    date: new Date(),
    format: 'DD/MM/YYYY'
  });
  const onChangeDate = newDate => {
    return setDateState({ date: newDate });
  };
  const cont = e => {
    e.preventDefault();
    props.nextStep();
  };
  const { date, format, mode, inputFormat } = dateState;
  return (
    <div className='col-sm-8 offset-sm-2'>
      <form onSubmit={props.stepHandler}>
        <div className='row'>
          <div className='col-sm-4 col-sm-offset-1'>
            <div className='picture-container'>
              <div className='picture'>
                <img
                  src='assets/img/default-avatar.png'
                  className='picture-src'
                  id='wizardPicturePreview'
                  title
                />
                <input type='file' id='wizard-picture' />
              </div>
            </div>
          </div>
          <div className='col-sm-7'>
            <Input
              id='title'
              type='input'
              label='Name event'
              validations={[VAL_REQUIRED()]}
              onInput={props.inputHandler}
              errorMessage='The field is required'
            />
            <div className='row'>
              <div className='col-sm-6'>
                <Selector
                  type='select'
                  id='select'
                  label='Choose category'
                  onInput={props.inputHandler}
                  validations={[VAL_REQUIRED()]}
                  errorMessage='The field is required'
                  className='col-md-6'
                />
              </div>
              <div className='col-sm-6'>
                <Datetime
                  input
                  dateFormat={format}
                  onChange={onChangeDate}
                  inputProps={{ placeholder: 'Select the date' }}
                  validations={[VAL_REQUIRED()]}
                />
              </div>
            </div>
          </div>
          <div className='col-sm-10 offset-sm-1'>
            <div className='label-floating'>
              <Input
                id='description'
                type='textarea'
                label='Write description'
                onInput={props.inputHandler}
                validations={[VAL_MIN_LENGTH(5)]}
                errorMessage='Write at least 5 characters!'
              />
            </div>
          </div>
        </div>

        <div className='addBtn col-sm-12'>
          <button type='submit' className='btn btn-outline-success'>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepOne;
