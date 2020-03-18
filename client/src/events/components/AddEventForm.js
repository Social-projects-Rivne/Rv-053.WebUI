import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

import Input from '../../shared/components/FormElements/Input';
import Selector from '../../shared/components/FormElements/Select';
import Datepicker from '../../shared/components/FormElements/Datepicker';
import ImageUpload from './ImageUpload';
import { VAL_MIN_LENGTH, VAL_REQUIRED } from '../../shared/utilities/validation';
import { api_server_url } from '../../shared/utilities/globalVariables';
import './EditEventForm.css';

const EditEventForm = props => {
  const [categoriesItems, setCategoriesItems] = useState([]);
  const [showDropdownCatecoryFlag, setShowDropdownCategoryFlag] = useState(false);

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
          <button
            type="button"
            onFocus={() => {
              setShowDropdownCategoryFlag(true);
            }}
            onBlur={() => {
              setShowDropdownCategoryFlag(false);
            }}
          >
            Choose category
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
        <div className="col-md-6">
          <Input
            id="address"
            type="input"
            onInput={props.onInputHandler}
            label="Address"
            validations={[VAL_REQUIRED()]}
            errorMessage="The field is required"
          />
        </div>
        <div className="col-md-6">
          <Input
            id="country"
            type="input"
            onInput={props.onInputHandler}
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
            onInput={props.onInputHandler}
            validations={[VAL_REQUIRED()]}
            errorMessage="The field is required"
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
            onInput={props.onInputHandler}
            validations={[VAL_REQUIRED()]}
            errorMessage="The field is required"
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
            onInput={props.onInputHandler}
            validations={[VAL_REQUIRED()]}
            errorMessage="The field is required"
          />
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

export default EditEventForm;
