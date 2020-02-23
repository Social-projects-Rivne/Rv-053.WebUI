import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { api_server_url } from './../../shared/utilities/globalVariables';
import { useForm } from './../../shared/hooks/useForm';
import { AuthContext } from './../../shared/context/auth-context';
import EditForm from './../components/EditForm';

const EditProfile = () => {
  const accessToken = useContext(AuthContext).token;
  const [userDataState, setUserDataState] = useState();
  const history = useHistory();

  const headers = {
    Authorization: 'Bearer ' + accessToken
  };
  const [formState, inputHandler, setFormData] = useForm(
    {
      firstname: {
        value: '',
        isValid: false
      },
      lastname: {
        value: '',
        isValid: false
      },
      sex: {
        value: '',
        isValid: true
      }
    },
    false
  );

  const getUserData = async () => {
    const userData = await axios.get(api_server_url + '/api/user/current', {
      headers
    });
    userData.data.data.user.birthday = userData.data.data.user.birthday.split(
      '-'
    );
    setUserDataState(userData.data.data.user);
    console.log('unupdated');
    console.log(userData.data.data.user);
  };

  useEffect(() => {
    if (accessToken) getUserData();
  }, [accessToken]);

  useEffect(() => {
    if (userDataState) {
      setFormData(
        {
          firstname: {
            value: userDataState.first_name,
            isValid: true
          },
          lastname: {
            value: userDataState.last_name,
            isValid: true
          },
          birth_day: {
            value: userDataState.birthday[2],
            isValid: true
          },
          birth_month: {
            value: userDataState.birthday[1],
            isValid: true
          },
          birth_year: {
            value: userDataState.birthday[0],
            isValid: true
          },
          sex: {
            value: userDataState.sex,
            isValid: true
          }
        },
        true
      );
    }
  }, [userDataState]);

  const submitFormHandler = async event => {
    event.preventDefault();
    console.log(formState);

    if (formState.formValidity) {
      const updatedUser = {
        first_name: formState.inputs.firstname.value,
        last_name: formState.inputs.lastname.value,
        birthday: format(
          new Date(
            formState.inputs.birth_year.value,
            formState.inputs.birth_month.value - 1,
            formState.inputs.birth_day.value
          ),
          'MM/dd/yyyy'
        ),
        sex: formState.inputs.sex.value
      };
      console.log('updated');
      console.log(updatedUser);
      const res = await axios.put(
        'http://localhost:5001/api/user/current/',
        updatedUser,
        {
          headers
        }
      );
      if (res.data.status == 'success') {
        history.push('/profile/my', { showUpdateNotification: true });
      }
    }
  };
  return (
    <>
      {userDataState ? (
        <EditForm
          inputHandler={inputHandler}
          submitFormHandler={submitFormHandler}
          user={userDataState}
        />
      ) : null}
    </>
  );
};

export default EditProfile;
