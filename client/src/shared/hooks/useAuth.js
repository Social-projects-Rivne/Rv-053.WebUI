import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null);

  const login = useCallback((accessToken, expiresIn) => {
    setAccessToken(accessToken);
    setTokenExpirationDate(new Date(expiresIn * 1000));
  }, []);

  const logout = useCallback(() => {
    setAccessToken(null);
    setTokenExpirationDate(null);
  }, []);

  const refreshTokens = async () => {
    const res = await axios.post('http://localhost:5001/api/auth/refresh');
    // console.log(res);
    // setTokenExpirationDate(res.data.tokens);
    // setAccessToken(res.tokens);
    console.log('refreshing token');
  };

  useEffect(() => {
    let refreshTimer;
    if (accessToken && tokenExpirationDate) {
      refreshTimer = tokenExpirationDate.getTime() - new Date().getTime();
      console.log(refreshTimer);
      setTimeout(refreshTokens, refreshTimer);
    } else {
      clearTimeout(refreshTimer);
    }
    console.log(tokenExpirationDate);
  }, [login, logout, tokenExpirationDate, accessToken]);

  return { accessToken, login, logout, tokenExpirationDate };
};
