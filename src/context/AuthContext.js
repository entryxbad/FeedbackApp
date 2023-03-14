import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useEffect} from 'react';
import {authUrl} from '../constants/Constants';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const login = () => {
    setIsLoading(true);
    fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        username: 'test',
        password: 'test',
      }),
    })
      .then((response) =>
        response.json().then((response) => console.log('RESPONSE:', response)),
      )
      .catch((error) => {
        console.log('AuthError:', error);
      });
    setUserToken('qwerty');
    AsyncStorage.setItem('userToken', 'qwerty'); //userToken
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userToken');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem('userToken');
      setUserToken(userToken);
      setIsLoading(false);
    } catch (error) {
      console.log(`Is logged in error ${error}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{login, logout, isLoading, userToken}}>
      {children}
    </AuthContext.Provider>
  );
};
