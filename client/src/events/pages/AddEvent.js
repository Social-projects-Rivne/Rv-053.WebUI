import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { useForm } from "../../shared/hooks/useForm";
import { AuthContext } from "../../shared/context/auth-context";
import ScrollToTop from "../..//shared/components/UI/ScrollToTop";
import AddEventForm from "../components/AddEventForm";
import objToFormData from "../../shared/utilities/objToFormData";
import { api_server_url } from "../../shared/utilities/globalVariables";
import "./AddEvent.css";

const AddEvent = () => {
  const history = useHistory();
  const accessToken = useContext(AuthContext).token;
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + accessToken
  };
  const [coordinates, setCoordinates] = useState({
    lat: "50.6199",
    lng: "26.251617"
  });

  if (coordinates) {
  }
  const [notificationState, setNotificationState] = useState({
    message: "some message",
    show: false
  });

  const [eventCategory, setEventCategory] = useState({
    id: null,
    category: "Choose category"
  });
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      },
      price: {
        value: "",
        isValid: false
      },
      age: {
        value: "",
        isValid: false
      },
      date: {
        value: "",
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
        const updatedEventData = {
          name: formState.inputs.title.value,
          description: formState.inputs.description.value,
          location: `${coordinates.lat},${coordinates.lng}`,
          datetime: formState.inputs.date.value,
          // duration: formState.inputs.duration.value,
          max_participants: formState.inputs.amount.value,
          min_age: formState.inputs.age.value,
          cover: imgObject,
          price: formState.inputs.price.value
            ? formState.inputs.price.value + " UAH"
            : "",
          category: eventCategory.id
        };
        const updatedEventFormData = objToFormData(updatedEventData);
        const res = await axios.post(
          api_server_url + "/api/events",
          updatedEventFormData,
          {
            headers
          }
        );
        if (res.status === 200) {
          setNotificationState({
            message: res.data.status,
            show: true
          });
          history.push({
            pathname: "/redirect",
            state: {
              className: "p-0 auth alert alert-success",
              message: res.data.status
            }
          });
        } else {
          console.log("stupied error");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <>
      <ScrollToTop />
      <div className="container create__wrapper">
        <h2 className="create__tittle">Create event</h2>
        <AddEventForm
          onInputHandler={inputHandler}
          onSubmitFormHandler={submitFormHandler}
          imageUpload={getImgURL}
          setCoordinates={setCoordinates}
          coordinates={coordinates}
          category={eventCategory}
          onChooseCategory={e =>
            setEventCategory({ id: e.id, category: e.title })
          }
        />
      </div>
    </>
  );
};

export default AddEvent;
