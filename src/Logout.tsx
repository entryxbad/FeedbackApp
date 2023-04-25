import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from './context/AuthContext'
import LinearGradient from 'react-native-linear-gradient'

export const Logout = ({ navigation }) => {
  const [password, setPassword] = useState('')
  const { styles } = useStyle()
  const { logout } = useContext(AuthContext)

  const handleLogout = () => {
    if (password === 'test') {
      logout()
      navigation.navigate('Login')
    } else {
      Alert.alert('Неверный пароль')
    }
  }

  return (
    <LinearGradient
      colors={['#009be5', '#eaeff2', '#1976d3']}
      start={{ x: 1, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <Text style={styles.headerText}>Выход из учётной записи</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder='Введите пароль'
            autoCapitalize='none'
            value={password}
            onChangeText={setPassword}
          ></TextInput>
          <TouchableOpacity style={styles.buttonExit} onPress={handleLogout}>
            <Text style={styles.buttonExitText}>Выйти</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Назад</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </LinearGradient>
  )
}

const useStyle = () => {
  const { width, height } = useWindowDimensions()
  const styles = StyleSheet.create({
    wrapper: {
      height: height,
      width: width,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    headerText: {
      color: '#000',
      fontSize: width * 0.05
    },
    input: {
      backgroundColor: '#fff',
      width: width * 0.4,
      height: height * 0.08,
      borderWidth: 2,
      borderRadius: width * 0.01,
      borderColor: '#B3B3B3',
      marginTop: 30,
      padding: 10,
      fontSize: width * 0.015
    },
    button: {
      backgroundColor: '#1a75d4',
      borderRadius: width * 0.01,
      width: width * 0.4,
      padding: 10,
      marginTop: 30,
      alignItems: 'center'
    },
    buttonExit: {
      borderWidth: 2,
      borderRadius: width * 0.01,
      borderColor: '#1a75d4',
      width: width * 0.4,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
      padding: 10
    },
    buttonText: {
      color: '#fff',
      fontSize: width * 0.028
    },
    buttonExitText: {
      color: '#1a75d4',
      fontSize: width * 0.028
    }
  })
  return { styles }
}
