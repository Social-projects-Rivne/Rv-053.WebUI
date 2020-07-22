import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Notificator from '../../components/UI/Notificator';
import { api_server_url } from '../../utilities/globalVariables';

const EmailConfirmation = props => {
  const [notification, setNotification] = useState({
    message: '',
    show: false,
    isSuccess: false
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post(api_server_url + '/api/auth/confirmemail/', {
          token: props.match.params.token
        });
        if (res.data.success) {
          setNotification({
            show: true,
            message: 'Your email is confirmed. Now you can sign in.',
            isSuccess: true
          });
        }
      } catch (e) {
        console.log(e);
        setNotification({
          show: true,
          message: 'Something goes wrong. Try again later.',
          isSuccess: false
        });
      }
    })();
  }, [props.match.params.token]);

  return (
    <>
      {notification.show ? (
        <Notificator
          className={
            'auth p-0 alert ' + (notification.isSuccess === true ? 'success-note' : 'alert-danger')
          }
          message={notification.message}
        />
      ) : null}
    </>
  );
};

export default withRouter(EmailConfirmation);
