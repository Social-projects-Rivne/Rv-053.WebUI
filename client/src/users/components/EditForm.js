import React, { useState } from 'react';
import { VAL_REQUIRED } from './../../shared/utilities/validation';
import Input from './../../shared/components/FormElements/Input';
import Card from './../../shared/components/UI/Card';
import Button from './../../shared/components/UI/Button';
import EditAvatar from './EditAvatar';
import './EditForm.css';

const EditForm = props => {
  const [showModal, setShow] = useState(false);
  const renderModal = () => {
    console.log(props.user);
    return (
      <div style={{ display: showModal ? 'block' : 'none' }} className="modal">
        <div className="modal-dialog" role="dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Upload an Avatar</h5>

              <button type="button" className="close" onClick={() => setShow(false)}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <EditAvatar key={props.user.id} user={props.user} refAvatar={props.refAvatar} />
            </div>
            <div className="modal-footer">
              <Button onClick={() => setShow(false)}>Close</Button>
              <Button
                onClick={e => {
                  props.uploadPhoto(e);
                  setShow(false);
                }}
              >
                Save changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {showModal && renderModal()}
      <Card className="card_wrapper">
        <h2 className="update-title">Update Profile</h2>
        <div className="div-row">
          <div className="profile-avatar__wrapper" className="div-col-left">
            {!props.user.avatar ? (
              <span className="profile-avatar">
                <span className="profile-avatar__head"></span>
                <span className="profile-avatar__body"></span>
              </span>
            ) : (
              <img className="profile-avatar" src={props.user.avatar} alt="" />
            )}
          </div>
          <div className="div-col-right">
            <Button className="button-avatar" onClick={() => setShow(true)}>
              Upload an Image
            </Button>

            {props.user.avatar && (
              <Button className="button-avatar" onClick={e => props.removePhoto(e)}>
                Remove photo
              </Button>
            )}
          </div>
        </div>

        <form onSubmit={props.submitFormHandler}>
          <Input
            id="firstname"
            type="input"
            label="First Name"
            onInput={props.inputHandler}
            errorMessage="Input a valid first name"
            validations={[VAL_REQUIRED()]}
            initValue={props.user.first_name}
            initValid="true"
          />
          <Input
            id="lastname"
            type="input"
            label="Last Name"
            onInput={props.inputHandler}
            errorMessage="Input a valid last name"
            validations={[VAL_REQUIRED()]}
            initValue={props.user.last_name}
            initValid="true"
          />
          <div className="input_wrapper-number mb-4">
            <Input
              id="birth_day"
              type="number"
              label="Day"
              onInput={props.inputHandler}
              initValid="true"
              validations={[VAL_REQUIRED()]}
              initValue={props.user.birthday[0] || null}
              min="0"
              max="31"
            />
            <Input
              id="birth_month"
              type="number"
              label="Month"
              onInput={props.inputHandler}
              initValue={props.user.birthday[1] || null}
              validations={[VAL_REQUIRED()]}
              min="1"
              max="12"
            />
            <Input
              id="birth_year"
              type="number"
              label="Year"
              onInput={props.inputHandler}
              initValue={props.user.birthday[2] || null}
              validations={[VAL_REQUIRED()]}
              min="1960"
              max="2015"
            />
          </div>
          <div className="radio-wrapper mb-4">
            <Input
              type="radio"
              name="sex"
              id="sex"
              value="Female"
              onInput={props.inputHandler}
              validations={[]}
              checked={props.user.sex == 'Female' ? true : null}
              label="Woman"
              initValid="true"
            />
            <Input
              type="radio"
              name="sex"
              id="sex"
              value="Male"
              onInput={props.inputHandler}
              validations={[]}
              checked={props.user.sex == 'Male' ? true : null}
              label="Man"
              initValid="true"
            />
          </div>
          <Button type="submit">UPDATE</Button>
        </form>
      </Card>
    </>
  );
};

export default EditForm;
