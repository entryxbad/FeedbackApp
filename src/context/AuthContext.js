import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { createContext, useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { authUrl, registerDeviceUrl } from '../constants/Constants'
import DeviceInfo from 'react-native-device-info'
import jwt_decode from 'jwt-decode'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [userToken, setUserToken] = useState(null)

  const errorAlert = () => {
    Alert.alert('Неверный логин или пароль')
  }

  //Запрос на логин
  const login = async (number, password) => {
    setIsLoading(true)

    try {
      const data = {
        number,
        password
      }

      console.log('Before axios.post')

      const response = await axios.post(`${authUrl}`, data)

      console.log('After axios.post')

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
      const userId = decodeToken.id

      await registerDevice(deviceId, userId)
      console.log('device ID:', deviceId)
      console.log('Registration successful') // Отладочное
    } catch (error) {
      if (error.response) {
        // Запрос был сделан, и сервер ответил кодом состояния, который
        // выходит за пределы 2xx
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      } else if (error.request) {
        // Запрос был сделан, но ответ не получен
        // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
        // http.ClientRequest в node.js
        console.log(error.request)
      } else {
        // Произошло что-то при настройке запроса, вызвавшее ошибку
        console.log('Error', error.message)
      }
      console.log(error.config)
      error.toJSON()
      errorAlert()
    } finally {
      setIsLoading(false)
    }
  }

  //Регистрация устройства
  const registerDevice = async (deviceId, userId, name = 'test') => {
    try {
      const data = {
        deviceId,
        userId,
        name
      }

      console.log('NAME:', name)

      const response = await axios.post(`${registerDeviceUrl}`, data)

      console.log('Ответ регистрации устройства', response.data)

      // Сохранение данных устройства в AsyncStorage
      AsyncStorage.setItem('robotData', JSON.stringify(response.data))
    } catch (error) {
      console.log('Ошибка при регистрации устройства', error)
      // Обработка ошибки
    }
  }

  const logout = () => {
    setIsLoading(true)
    setUserToken(null)
    AsyncStorage.removeItem('userToken')
    setIsLoading(false)
  }

  const isLoggedIn = async () => {
    try {
      setIsLoading(true)
      let userToken = await AsyncStorage.getItem('userToken')
      setUserToken(userToken)
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
