import React from 'react';

import Card from '../../shared/components/UI/Card';
import { useForm } from '../../shared/hooks/useForm';
import EditEventForm from '../components/EditEventForm';

const EditEvent = () => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      select: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      location: {
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
      amount: {
        value: '',
        isValid: false
      }
    },

    false
  );

  const submitFormHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };
  return (
    <Card className="addEvent">
      <h2>Edit event</h2>
      <EditEventForm onInputHandler={inputHandler} onSubmitFormHandler={submitFormHandler} />
    </Card>
  );
};

export default EditEvent;
