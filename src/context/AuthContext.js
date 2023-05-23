import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { createContext, useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { authUrl } from '../constants/Constants'
//import DeviceInfo from 'react-native-device-info'
import jwt_decode from 'jwt-decode'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [userToken, setUserToken] = useState(null)

  const errorAlert = () => {
    Alert.alert('Неверный логин или пароль')
  }

  const login = async (number, password) => {
    setIsLoading(true)

    try {
      //const deviceId = await DeviceInfo.getUniqueId()

      const data = {
        number,
        password
        //deviceId
      }

      axios
        .post(`${authUrl}`, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          //console.log('Device ID:', deviceId)
          console.log('Response:', response.data)
          const decodeToken = jwt_decode(response.data)
          console.log('Decode JWT', decodeToken)

          //setUserToken(response.data)
          //AsyncStorage.setItem('userToken', response.data)
          //const returnedDeviceId = response.data.deviceId
          //console.log('Returned Device ID:', returnedDeviceId)
        })
        .catch((error) => {
          console.log('Ошибка при логине:', error)
          errorAlert()
        })
        .finally(() => {
          setIsLoading(false)
        })
    } catch (error) {
      console.log('Ошибка при получении deviceId:', error)
      setIsLoading(false)
    }
  }
  const logout = () => {
    //setIsLoading(true)
    //setUserToken(null)
    // AsyncStorage.removeItem('userToken');
    setIsLoading(false)
  }

  const isLoggedIn = async () => {
    try {
      setIsLoading(true)
      //let userToken = await AsyncStorage.getItem('userToken')
      //setUserToken(userToken)
      setIsLoading(false)
    } catch (error) {
      console.log(`Is logged in error ${error}`)
    }
  }

  useEffect(() => {
    isLoggedIn()
  }, [])

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
      {children}
    </AuthContext.Provider>
  )
}
