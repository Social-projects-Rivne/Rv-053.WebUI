import React from 'react';

import Card from '../../shared/components/UI/Card';
import { useForm } from '../../shared/hooks/useForm';
import EditEventForm from '../components/EditEventForm';

const EditEvent = () => {
  const [formState, inputHandler] = useForm();

  const updateEventData = async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  };

  const submitFormHandler = event => {
    event.preventDefault();
    console.log(formState);
  };
  return (
    <Card className="addEvent">
      <h2>Edit event</h2>
      <EditEventForm onInputHandler={inputHandler} onSubmitFormHandler={submitFormHandler} />
    </Card>
  );
};

export default EditEvent;
