import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null);

  const login = useCallback((accessToken, expiresIn) => {
    setAccessToken(accessToken);
    setTokenExpirationDate(new Date(expiresIn));
  }, []);

  const logout = useCallback(() => {
    axios.post('http://localhost:5001/api/auth/logout', null, {
      withCredentials: true
    });
    setAccessToken(null);
    setTokenExpirationDate(null);
  }, []);

  const refreshTokens = async () => {
    try {
      const res = await axios.post('http://localhost:5001/api/auth/refresh', null, {
        withCredentials: true
      });
      console.log('refreshing token');
      setTokenExpirationDate(new Date(res.data.expiresIn));
      setAccessToken(res.data.token);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    let refreshTimer;
    if (tokenExpirationDate) {
      console.log('expirationdate: ' + tokenExpirationDate);
      refreshTimer = tokenExpirationDate.getTime() - new Date().getTime();
      console.log(refreshTimer);
      setTimeout(refreshTokens, refreshTimer);
    }
  }, [tokenExpirationDate]);

  useEffect(() => {
    refreshTokens();
  }, []);

  return { accessToken, login, logout, tokenExpirationDate };
};
