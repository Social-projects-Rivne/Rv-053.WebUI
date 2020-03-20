import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback
} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { api_server_url } from './../../shared/utilities/globalVariables';
import { AuthContext } from './../../shared/context/auth-context';
import Button from './../../shared/components/UI/Button';
import EditAvatarForm from '../components/EditAvatarForm';

import './EditAvatar.css';

const EditAvatar = () => {
  const history = useHistory();
  const refAvatar = useRef(null);
  const accessToken = useContext(AuthContext).token;
  const [userDataState, setUserDataState] = useState();

  const headers = useMemo(
    () => ({
      Authorization: 'Bearer ' + accessToken
    }),
    [accessToken]
  );
  const getUserData = useCallback(async () => {
    const userData = await axios.get(api_server_url + '/api/user/current', {
      headers
    });
    setUserDataState(userData.data.data.user);
  }, [headers]);

  useEffect(() => {
    if (accessToken) getUserData();
  }, [accessToken, getUserData]);

  const uploadPhoto = () => {
    if (refAvatar.current !== null) {
      refAvatar.current.getImageScaledToCanvas().toBlob(async function(blob) {
        let formdata = new FormData();
        formdata.append('avatar', blob, 'avatar.png');
        const headers = {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'multipart/form-data'
        };
        const res = await axios.put(
          api_server_url + '/api/user/avatar/',
          formdata,
          {
            headers
          }
        );
        if (res.data.status === 'success') {
          history.push('/editprofile');
        }
      });
    }
  };

  return (
    <div className='my__container'>
      {userDataState ? (
        <div>
          <h2 className='update-title'>Upload Avatar</h2>
          <EditAvatarForm
            key={userDataState.id}
            refAvatar={refAvatar}
            user={userDataState}
          />
          <div className='avatar-buttons'>
            <Button onClick={() => history.push('/editprofile')}>Close</Button>
            &nbsp;
            <Button onClick={() => uploadPhoto()}>Save changes</Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EditAvatar;
