import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";

import Input from "../../shared/components/FormElements/Input";
import Selector from "../../shared/components/FormElements/Select";
import Switch from "../../shared/components/UI/Switch";
import Datepicker from "../../shared/components/FormElements/Datepicker";
import AutocompletePlaces from "../../shared/components/FormElements/AutocompletePlaces";
import DisappearingAnimation from "../../shared/components/UI/Animations/DisappearingAnimation";
import Map from "../../shared/components/UI/Map";
import ImageUpload from "./ImageUpload";
import {
  VAL_MIN_LENGTH,
  VAL_REQUIRED,
  VAL_NUMBERS
} from "../../shared/utilities/validation";
import { api_server_url } from "../../shared/utilities/globalVariables";
import "./EditEventForm.css";

const AddEventForm = props => {
  const [categoriesItems, setCategoriesItems] = useState([]);
  const [showDropdownCatecoryFlag, setShowDropdownCategoryFlag] = useState(
    false
  );
  const [priceFlag, setPriceFlag] = useState(true);
  const [ageLimitFlag, setAgeLimitFlag] = useState(true);
  const [placesLimitFlag, setPlacesLimitFlag] = useState(true);

  const fetchCatecoriesList = useCallback(async () => {
    try {
      const res = await axios.get(api_server_url + "/api/tags");
      const categoriesList = res.data.categories.map(category => ({
        icon: "",
        title: category.category,
        extraInfo: "",
        id: category.id
      }));
      setCategoriesItems(categoriesList);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const priceSwitchHandler = state => {
    setPriceFlag(state);
    if (priceFlag) {
      InputHandler("price", "", true);
    }
  };
  const ageLimitSwitchHandler = state => {
    setAgeLimitFlag(state);
    if (ageLimitFlag) {
      InputHandler("age", 0, true);
    }
  };
  const placesLimitSwitchHandler = state => {
    setPlacesLimitFlag(state);
    if (placesLimitFlag) {
      InputHandler("amount", 0, true);
    }
  };

  const renderMap = () => {
    let coord = props.coordinates;
    if (coord.lat == null && coord.lng == null) {
      return <div></div>;
    } else {
      return (
        <div className="row">
          <div className="col-md-12 map-container">
            <Map center={coord} zoom={16} />
          </div>
        </div>
      );
    }
  };
  const { onInputHandler } = props;
  const InputHandler = useCallback(
    (id, value, isValid) => {
      onInputHandler(id, value, isValid);
    },
    [onInputHandler]
  );

  useEffect(() => {
    fetchCatecoriesList();
  }, [fetchCatecoriesList]);
  return (
    <form
      onSubmit={props.onSubmitFormHandler}
      className="col-md-10 offset-md-1"
      encType="multipart/form-data"
    >
      <div className="form-group">
        <Input
          id="title"
          type="input"
          label="Tittle"
          validations={[VAL_REQUIRED()]}
          onInput={props.onInputHandler}
          errorMessage="The field is required"
        />
      </div>
      <div className="row">
        <div className="col-md-6">
          <label>Category</label>
          <button
            type="button"
            className="category__btn"
            onFocus={() => {
              setShowDropdownCategoryFlag(true);
            }}
            onBlur={() => {
              setShowDropdownCategoryFlag(false);
            }}
          >
            {props.category.category}
          </button>
          <Selector
            triger={showDropdownCatecoryFlag}
            items={categoriesItems}
            onChange={props.onChooseCategory}
          />
        </div>
        <div className="col-md-6">
          <Datepicker
            type="select"
            id="date"
            label="Date"
            onInput={props.onInputHandler}
            validations={[VAL_REQUIRED()]}
            errorMessage="The field is required"
          />
        </div>
      </div>
      <Input
        id="description"
        type="textarea"
        label="Description"
        onInput={props.onInputHandler}
        validations={[VAL_MIN_LENGTH(5)]}
        errorMessage="Write at least 5 characters!"
      />
      <ImageUpload name="cover" onGetImg={props.imageUpload} />
      <div className="row">
        <div className="col-md-10 offset-md-1 map_input">
          <AutocompletePlaces
            className=""
            setCoordinates={props.setCoordinates}
          />
        </div>
        <div className="col-md-12"> {renderMap()}</div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-4">
              <div className="d-inline-block">
                <label>Price</label>
                <Switch
                  id="price_switch"
                  titleOn="PAID"
                  titleOff="FREE"
                  onSwitch={priceSwitchHandler}
                  initSwitch={priceFlag}
                />
              </div>
            </div>
            <div className="col-md-8">
              <DisappearingAnimation
                triger={priceFlag}
                timeout={400}
                mountOnEnter
                unmountOnExit
              >
                <Input
                  id="price"
                  type="number"
                  label="Price"
                  onInput={InputHandler}
                  validations={[VAL_NUMBERS()]}
                  errorMessage="Enter a valid price"
                  initValid={true}
                />
              </DisappearingAnimation>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-4">
              <div className="d-inline-block">
                <label>Places</label>
                <Switch
                  id="amount_switch"
                  titleOn="LIMIT"
                  titleOff="ANY"
                  onSwitch={placesLimitSwitchHandler}
                  initSwitch={placesLimitFlag}
                />
              </div>
            </div>
            <div className="col-md-8">
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
                  // initValue={props.eventData.amount.value}
                  initValid={true}
                />
              </DisappearingAnimation>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-4">
              <div className="d-inline-block">
                <label>Age</label>
                <Switch
                  id="age_switch"
                  titleOn="LIMIT"
                  titleOff="ANY"
                  onSwitch={ageLimitSwitchHandler}
                  initSwitch={ageLimitFlag}
                />
              </div>
            </div>
            <div className="col-md-8">
              <DisappearingAnimation
                triger={ageLimitFlag}
                timeout={400}
                mountOnEnter
                unmountOnExit
              >
                <Input
                  id="age"
                  type="number"
                  label="Minimal age"
                  step="1"
                  onInput={InputHandler}
                  validations={[VAL_NUMBERS(0, 120)]}
                  errorMessage="Enter correct age"
                  initValid={true}
                />
              </DisappearingAnimation>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <button className="btn btn-outline-primary create__btn" type="submit">
          Add Event
        </button>
      </div>
    </form>
  );
};

export default AddEventForm;
