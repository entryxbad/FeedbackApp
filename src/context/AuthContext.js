import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { createContext, useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { authUrl, checkDeviceIdUrl } from '../constants/Constants'
import DeviceInfo from 'react-native-device-info'
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
      const data = {
        number,
        password
      }

      const response = await axios.post(`${authUrl}`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log('Response:', response.data)
      const decodeToken = jwt_decode(response.data)
      console.log('Decode JWT:', decodeToken)

      if (decodeToken !== null) {
        setUserToken(decodeToken)
        AsyncStorage.setItem('userToken', JSON.stringify(decodeToken))
      }

      const deviceId = await DeviceInfo.getAndroidId()
      console.log('Device ID:', deviceId)
      console.log('userID:', decodeToken.id)

      await checkDevice(deviceId)
    } catch (error) {
      console.log('Ошибка при логине:', error)
      errorAlert()
    } finally {
      setIsLoading(false)
    }
  }

  const checkDevice = async (deviceId, id) => {
    try {
      const data = {
        deviceId
      }

      const response = await axios.post(`${checkDeviceIdUrl}`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log('Ответ проверки устройства', response.data)
    } catch (error) {
      console.log('Ошибка при проверке устройства', error)
    }
  }

  const logout = () => {
    // setIsLoading(true)
    // setUserToken(null)
    // AsyncStorage.removeItem('userToken')
    // setIsLoading(false)
  }

  const isLoggedIn = async () => {
    try {
      // setIsLoading(true)
      // let userToken = await AsyncStorage.getItem('userToken')
      // setUserToken(userToken)
      // setIsLoading(false)
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
