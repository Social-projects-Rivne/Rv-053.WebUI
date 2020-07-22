import React from 'react';
import { useHistory } from 'react-router-dom';

import { VAL_REQUIRED } from './../../shared/utilities/validation';
import Input from './../../shared/components/FormElements/Input';
import Button from './../../shared/components/UI/Button';
import './EditForm.css';

const EditForm = props => {
  const history = useHistory();
  return (
    <div className='my__container'>
      <section className="update-profile__inner">
        <h2 className='update-title'>Update Profile</h2>
        <div className='update-profile__top'>
          <div className='profile-avatar__wrapper'>
            {!props.avatar ? (
              <span className='profile-avatar'>
                <span className='profile-avatar__head'></span>
                <span className='profile-avatar__body'></span>
              </span>
            ) : (
              <img className='profile-avatar' src={props.avatar} alt='' />
            )}
          </div>
          <div className="update-profile_btn">
            <Button
              className='button-avatar'
              onClick={() => history.push('/editavatar', { show: true })}
            >
              Upload an Image
            </Button>

            {props.avatar && (
              <Button
                className='button-avatar'
                onClick={e => props.removePhoto(e)}
              >
                Remove photo
              </Button>
            )}
          </div>
        </div>

        <form onSubmit={props.submitFormHandler}>
          <Input
            id='first_name'
            type='input'
            label='First Name'
            onInput={props.inputHandler}
            validations={[VAL_REQUIRED()]}
            initValue={props.user.first_name.value}
            initValid='true'
            errorMessage='Input a valid first name'
          />
          <Input
            id='last_name'
            type='input'
            label='Last Name'
            onInput={props.inputHandler}
            errorMessage='Input a valid last name'
            validations={[VAL_REQUIRED()]}
            initValue={props.user.last_name.value}
            initValid='true'
          />
          <div className='input_wrapper-number mb-4'>
            <Input
              id='birth_day'
              type='number'
              label='Day'
              onInput={props.inputHandler}
              validations={[VAL_REQUIRED()]}
              initValue={+props.user.birth_day.value || null}
              min='0'
              max='31'
              initValid='true'
            />
            <Input
              id='birth_month'
              type='number'
              label='Month'
              onInput={props.inputHandler}
              initValue={+props.user.birth_month.value || null}
              validations={[VAL_REQUIRED()]}
              min='1'
              max='12'
              initValid='true'
            />
            <Input
              id='birth_year'
              type='number'
              label='Year'
              onInput={props.inputHandler}
              initValue={+props.user.birth_year.value || null}
              validations={[VAL_REQUIRED()]}
              min='1960'
              max='2015'
              initValid='true'
            />
          </div>
          <div className='radio-wrapper mb-4'>
            <Input
              type='radio'
              name='sex'
              id='sex'
              value='Female'
              initValue={props.user.sex.value}
              onInput={props.inputHandler}
              validations={[]}
              checked={props.user.sex.value === 'Female' ? true : null}
              label='Woman'
              initValid='true'
            />
            <Input
              type='radio'
              name='sex'
              id='sex'
              value='Male'
              initValue={props.user.sex.value}
              onInput={props.inputHandler}
              validations={[]}
              checked={props.user.sex.value === 'Male' ? true : null}
              label='Man'
              initValid='true'
            />
          </div>
          <Button type='submit'>UPDATE</Button>
        </form>
      </section>
    </div>
  );
};

export default EditForm;
