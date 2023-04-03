import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {authUrl} from '../constants/Constants';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const errorAlert = () => {
    Alert.alert('Неверный логин или пароль');
  };

  const login = (username, password) => {
    setUserToken('some super random secure token');
    setIsLoading(false);

    // axios
    //   .post(
    //     `${authUrl}`,
    //     {
    //       username,
    //       password,
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     },
    //   )
    //   .then((response) => {
    //     console.log(`RESPONSE: ${response.data.jwt}`);
    //     if (response.data.jwt !== undefined) {
    //       setUserToken(response.data.jwt);
    //       AsyncStorage.setItem('userToken', response.data.jwt);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(`Login error ${error}`);
    //     errorAlert();
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    // AsyncStorage.removeItem('userToken');
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
