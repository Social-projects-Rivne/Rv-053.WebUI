import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Notificator from '../../components/UI/Notificator';
import { api_server_url } from '../../utilities/globalVariables';

const EmailConfirmation = props => {
  const [notification, setNotification] = useState({
    message: '',
    show: false
  });
  const [emailToken, setEmailToken] = useState({ token: '' });

  useEffect(() => {
    setEmailToken({ token: props.match.params.token });
    (async () => {
      try {
        const res = await axios.post(api_server_url + '/api/auth/confirmemail/', { emailToken });
        if (res.data.success) {
          setNotification({ show: true, message: 'Your email is confirmed. Now you can sign in.' });
        }
      } catch (e) {
        console.log(e);
        setNotification({ show: true, message: 'Something goes wrong. Try again later.' });
      }
    })();
  }, []);

  return (
    <>
      {notification.show ? (
        <Notificator className="auth alert alert-danger p-0" message={notification.message} />
      ) : null}
    </>
  );
};

export default withRouter(EmailConfirmation);
