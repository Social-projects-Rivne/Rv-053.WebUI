import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo
} from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

import { api_server_url } from './../../shared/utilities/globalVariables';
import { useForm } from './../../shared/hooks/useForm';
import { AuthContext } from './../../shared/context/auth-context';
import EditForm from './../components/EditForm';

const EditProfile = () => {
  const accessToken = useContext(AuthContext).token;
  const [loadingFlag, setLoadingFlag] = useState(true);
  const [avatarState, setAvatarState] = useState('');
  const history = useHistory();

  const headers = useMemo(
    () => ({
      Authorization: 'Bearer ' + accessToken
    }),
    [accessToken]
  );
  const [formState, inputHandler, setFormData] = useForm(
    {
      first_name: {
        value: '',
        isValid: false
      },
      last_name: {
        value: '',
        isValid: false
      },
      sex: {
        value: '',
        isValid: false
      },
      birth_day: {
        value: '',
        isValid: false
      },
      birth_month: {
        value: '',
        isValid: false
      },
      birth_year: {
        value: '',
        isValid: false
      },
      sex: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const getUserData = useCallback(async () => {
    try {
      setLoadingFlag(true);
      const userData = await axios.get(api_server_url + '/api/user/current', {
        headers
      });
      userData.data.data.user.birthday = moment(
        +userData.data.data.user.birthday
      ).format('DD MM YYYY');
      userData.data.data.user.birthday = userData.data.data.user.birthday.split(
        ' '
      );

      setFormData(
        {
          first_name: {
            value: userData.data.data.user.first_name,
            isValid: true
          },
          last_name: {
            value: userData.data.data.user.last_name,
            isValid: true
          },
          birth_day: {
            value: userData.data.data.user.birthday[0],
            isValid: true
          },
          birth_month: {
            value: userData.data.data.user.birthday[1],
            isValid: true
          },
          birth_year: {
            value: userData.data.data.user.birthday[2],
            isValid: true
          },
          sex: {
            value: userData.data.data.user.sex,
            isValid: true
          }
        },
        true
      );
      setAvatarState(userData.data.data.user.avatar);
      setLoadingFlag(false);
    } catch (err) {
      console.log(err);
    }
  }, [setFormData, headers]);

  useEffect(() => {
    if (accessToken) getUserData();
  }, [accessToken, getUserData]);

  const submitFormHandler = async event => {
    event.preventDefault();
    if (formState.formValidity) {
      const updatedUser = {
        first_name: formState.inputs.first_name.value,
        last_name: formState.inputs.last_name.value,
        birthday: moment()
          .date(formState.inputs.birth_day.value)
          .month(formState.inputs.birth_month.value - 1)
          .year(formState.inputs.birth_year.value)
          .valueOf(),
        sex: formState.inputs.sex.value
      };
      const res = await axios.put(
        api_server_url + '/api/user/current',
        updatedUser,
        {
          headers
        }
      );
      if (res.data.status === 'success') {
        history.push('/profile/my', { show: true });
      }
    }
  };
  const removePhoto = async e => {
    setAvatarState('');
    await axios.delete(api_server_url + '/api/user/avatar/', {
      headers
    });
  };

  return (
    <>
      {!loadingFlag ? (
        <EditForm
          inputHandler={inputHandler}
          submitFormHandler={submitFormHandler}
          user={formState.inputs}
          avatar={avatarState}
          removePhoto={removePhoto}
        />
      ) : null}
    </>
  );
};

export default EditProfile;
