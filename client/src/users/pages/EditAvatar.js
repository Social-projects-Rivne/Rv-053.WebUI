import React, { useContext, useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { api_server_url } from './../../shared/utilities/globalVariables';
import { AuthContext } from './../../shared/context/auth-context';
import Button from './../../shared/components/UI/Button';
import Card from './../../shared/components/UI/Card';
import EditAvatarForm from '../components/EditAvatarForm';

import './EditAvatar.css';

const EditAvatar = () => {
  const history = useHistory();
  const refAvatar = useRef(null);
  const accessToken = useContext(AuthContext).token;
  const [userDataState, setUserDataState] = useState();

  const headers = {
    Authorization: 'Bearer ' + accessToken
  };

  const getUserData = async () => {
    const userData = await axios.get(api_server_url + '/api/user/current', {
      headers
    });
    setUserDataState(userData.data.data.user);
  };

  useEffect(() => {
    if (accessToken) getUserData();
  }, [accessToken]);

  const uploadPhoto = () => {
    if (refAvatar !== null) {
      refAvatar.current.getImageScaledToCanvas().toBlob(async function(blob) {
        let formdata = new FormData();
        formdata.append('avatar', blob, 'avatar.png');
        const headers = {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'multipart/form-data'
        };
        const res = await axios.put(api_server_url + '/api/user/avatar/', formdata, {
          headers
        });
        if (res.data.status == 'success') {
          history.push('/editprofile');
        }
      });
    }
  };

  return (
    <Card className="card_wrapper">
      {userDataState ? (
        <div>
          <h2 className="update-title">Upload Avatar</h2>
          <EditAvatarForm key={userDataState.id} refAvatar={refAvatar} user={userDataState} />
          <div className="avatar-buttons">
            <Button onClick={() => history.push('/editprofile')}>Close</Button>
            &nbsp;
            <Button onClick={() => uploadPhoto()}>Save changes</Button>
          </div>
        </div>
      ) : null}
    </Card>
  );
};

export default EditAvatar;
