import React, { useRef, useState, useCallback, useEffect } from 'react';
import DateTime from 'react-datetime';
import axios from 'axios';
import moment from 'moment';

import Input from '../../shared/components/FormElements/Input';
import EditGalleryForm from './EditGalleryForm';
import Switch from '../../shared/components/UI/Switch';
import DisappearingAnimation from '../../shared/components/UI/Animations/DisappearingAnimation';
import Selector from '../../shared/components/FormElements/Select';
import AutocompletePlaces from '../../shared/components/FormElements/AutocompletePlaces';
import Map from '../../shared/components/UI/Map';
import DurationPicker from '../../shared/components/FormElements/DurationPicker';
import { VAL_MIN_LENGTH, VAL_REQUIRED, VAL_NUMBERS } from '../../shared/utilities/validation';
import { api_server_url } from '../../shared/utilities/globalVariables';
import './EditEventForm.css';

const EditEventForm = props => {
  const fileInputRef = useRef(null);
  const [categoriesItems, setCategoriesItems] = useState([]);
  const [showDropdownCatecoryFlag, setShowDropdownCategoryFlag] = useState(false);
  const [priceFlag, setPriceFlag] = useState(props.eventData.price.value ? true : false);
  const [ageLimitFlag, setAgeLimitFlag] = useState(props.eventData.age.value ? true : false);
  const [placesLimitFlag, setPlacesLimitFlag] = useState(
    props.eventData.amount.value ? true : false
  );

  const fetchCatecoriesList = useCallback(async () => {
    try {
      const res = await axios.get(api_server_url + '/api/tags');
      const categoriesList = res.data.categories.map(category => ({
        icon: '',
        title: category.category,
        extraInfo: '',
        id: category.id
      }));
      setCategoriesItems(categoriesList);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchCatecoriesList();
  }, [fetchCatecoriesList]);

  const priceSwitchHandler = state => {
    setPriceFlag(state);
    if (priceFlag) {
      InputHandler('price', '', true);
    }
  };
  const ageLimitSwitchHandler = state => {
    setAgeLimitFlag(state);
    if (ageLimitFlag) {
      InputHandler('age', 0, true);
    }
  };
  const placesLimitSwitchHandler = state => {
    setPlacesLimitFlag(state);
    if (placesLimitFlag) {
      InputHandler('amount', 0, true);
    }
  };

  const showDropdownCatecoryFlagHandler = () => {
    setShowDropdownCategoryFlag(!showDropdownCatecoryFlag);
  };

  const { onInputHandler } = props;
  const InputHandler = useCallback(
    (id, value, isValid) => {
      onInputHandler(id, value, isValid);
    },
    [onInputHandler]
  );

  const yesterday = DateTime.moment().subtract(1, 'day');
  const validateStartDate = current => {
    return current.isAfter(yesterday);
  };

  const coord = props.eventData.location.value.split(',').reduce((obj, str, index) => {
    const coord = Number.parseFloat(str);
    if (index === 0) {
      obj = { ...obj, lat: coord };
    } else {
      obj = { ...obj, lng: coord };
    }
    return obj;
  }, {});

  const renderMap = () => {
    if (coord.lat === null && coord.lng === null) {
      return <div></div>;
    } else {
      return (
        <div className="col-lg-12 map-container">
          <Map center={coord} zoom={15} />
        </div>
      );
    }
  };

  return (
    <form onSubmit={props.onSubmitFormHandler} className="text-center">
      <div className="list__events-item-img edit-event__change-cover-container">
        <img
          src={
            typeof props.eventData.cover.value === 'object'
              ? URL.createObjectURL(props.eventData.cover.value)
              : props.eventData.cover.value
          }
          alt={props.eventData.cover.value}
          className="list__events-item-img"
        ></img>
        <span
          className="edit-event__change-cover-btn"
          onClick={() => (fileInputRef.current !== null ? fileInputRef.current.click() : null)}
        >
          change cover
        </span>
      </div>
      <Input
        id="cover"
        type="file"
        refer={fileInputRef}
        validations={[]}
        onInput={InputHandler}
        initValue={props.eventData.cover.value}
        initValid={true}
        errorMessage="Choose an image"
        acceptFileType="image/*"
      />
      <Input
        id="title"
        type="input"
        label="Name"
        validations={[VAL_REQUIRED()]}
        onInput={props.onInputHandler}
        initValue={props.eventData.title.value}
        initValid={true}
        errorMessage="Enter the name of event"
      />
      <Input
        id="description"
        type="textarea"
        label="Description"
        onInput={props.onInputHandler}
        validations={[VAL_MIN_LENGTH(5)]}
        initValue={props.eventData.description.value}
        initValid={true}
        errorMessage="Write at least 5 characters!"
      />
      <div className="row">
        <div className="col-lg-5 d-flex">
          <div className="col-2">
            <p className="switch__label">Cost:</p>
          </div>
          <div className="col-4 switch__block">
            <div className="d-inline-block">
              <Switch
                id="price_switch"
                titleOn="PAID"
                titleOff="FREE"
                onSwitch={priceSwitchHandler}
                initSwitch={priceFlag}
              />
            </div>
          </div>
          <div className="col-6">
            <DisappearingAnimation triger={priceFlag} timeout={400} mountOnEnter unmountOnExit>
              <Input
                id="price"
                type="number"
                label="Price"
                onInput={InputHandler}
                validations={[VAL_NUMBERS()]}
                errorMessage="Enter a valid price"
                initValue={props.eventData.price.value}
                initValid={true}
              />
            </DisappearingAnimation>
          </div>
        </div>
        <div className="col-lg-7 d-flex">
          <div className="col-4">
            <p className="switch__label">Places count:</p>
          </div>
          <div className="col-3 switch__block">
            <Switch
              id="amount_switch"
              titleOn="LIMIT"
              titleOff="ANY"
              onSwitch={placesLimitSwitchHandler}
              initSwitch={placesLimitFlag}
            />
          </div>
          <div className="col-5 input__block">
            <DisappearingAnimation
              triger={placesLimitFlag}
              timeout={400}
              mountOnEnter
              unmountOnExit
            >
              <Input
                id="amount"
                type="number"
                label="Amount"
                step="1"
                onInput={InputHandler}
                validations={[VAL_NUMBERS(1)]}
                errorMessage="Enter correct limit"
                initValue={props.eventData.amount.value}
                initValid={true}
              />
            </DisappearingAnimation>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-5 d-flex">
          <div className="col-2">
            <p className="switch__label">Age:</p>
          </div>
          <div className="col-4 switch__block">
            <Switch
              id="age_switch"
              titleOn="LIMIT"
              titleOff="ANY"
              onSwitch={ageLimitSwitchHandler}
              initSwitch={ageLimitFlag}
            />
          </div>
          <div className="col-6 inputfield__block">
            <DisappearingAnimation triger={ageLimitFlag} timeout={400} mountOnEnter unmountOnExit>
              <Input
                id="age"
                type="number"
                label="Minimal age"
                step="1"
                onInput={InputHandler}
                validations={[VAL_NUMBERS(0, 120)]}
                errorMessage="Enter correct age"
                initValue={props.eventData.age.value}
                initValid={true}
              />
            </DisappearingAnimation>
          </div>
        </div>
        <div className="col-lg-7 d-flex">
          <div className="col-5">
            <p className="switch__label">Choose category:</p>
          </div>
          <div className="col-7">
            <button
              className="btn-flat"
              type="button"
              onFocus={showDropdownCatecoryFlagHandler}
              onBlur={showDropdownCatecoryFlagHandler}
            >
              {props.category.category}
            </button>
            <Selector
              className="edit-event__dropdown-category"
              triger={showDropdownCatecoryFlag}
              items={categoriesItems}
              onChange={props.onChooseCategory}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-5 ">
          <label style={{ color: '#16a085' }} className="col-12">
            Date and time
          </label>
          <div className="col-12">
            <DateTime
              input={false}
              value={moment(Number.parseInt(props.eventData.datetime.value))}
              isValidDate={validateStartDate}
              timeFormat="HH:mm"
              onChange={date => InputHandler('datetime', moment(date).unix() * 1000, true)}
            />
          </div>
        </div>
        <div className="col-lg-7 ">
          <label style={{ color: '#16a085' }} className="col-12">
            Duration
          </label>
          <div className="col-12">
            <DurationPicker
              duration={props.eventData.duration.value}
              onChange={duration => InputHandler('duration', duration, true)}
            />
          </div>
        </div>
        <div className="col-lg-12">
          <label style={{ color: '#16a085' }} className="col-12">
            Place
          </label>
          {renderMap()}
          <AutocompletePlaces
            setCoordinates={coordinates =>
              InputHandler('location', `${coordinates.lat},${coordinates.lng}`, true)
            }
          />
        </div>
      </div>
      {!props.loadingGalleryFlag ? (
        <EditGalleryForm
          galleryData={props.galleryData}
          changeImageHandler={props.changeImageHandler}
          deleteImageHandler={props.deleteImageHandler}
          createImageHandler={props.createImageHandler}
        />
      ) : null}
      <button className="my__button ml-4 mb-4 mt-4 d-inline-block float-left" type="submit">
        Update
      </button>
    </form>
  );
};

export default EditEventForm;
