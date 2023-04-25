import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import React, { useState, useContext } from 'react'
import MaskInput from 'react-native-mask-input'
import { AuthContext } from './context/AuthContext'
import LinearGradient from 'react-native-linear-gradient'

export const LogIn = () => {
  const { styles } = useStyle()
  const [phone, setPhone] = useState('')
  const { login } = useContext(AuthContext)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)

  const handleChange = (masked, text) => {
    setPhone(masked)
    setUsername(text)
  }

  return (
    <LinearGradient
      colors={['#009be5', '#eaeff2', '#1976d3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <Text style={styles.headerText}>Войдите в учётную запись</Text>
          {/* <TextInput
        style={styles.input}
        placeholder="Логин"
        value={username}
        onChangeText={(text) => setUsername(text)}></TextInput> */}

          <MaskInput
            style={styles.input}
            value={phone}
            placeholder='Логин'
            keyboardType='numeric'
            onChangeText={handleChange}
            mask={[
              '+',
              '7',
              ' ',
              '(',
              /\d/,
              /\d/,
              /\d/,
              ')',
              ' ',
              /\d/,
              /\d/,
              /\d/,
              '-',
              /\d/,
              /\d/,
              '-',
              /\d/,
              /\d/
            ]}
          />

          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder='Пароль'
            autoCapitalize='none'
            value={password}
            onChangeText={(text) => setPassword(text)}
          ></TextInput>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              login(username, password)
            }}
          >
            <Text style={styles.buttonText}>Войти</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </LinearGradient>
  )
}

const useStyle = () => {
  const { height, width } = useWindowDimensions()

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
    buttonText: {
      color: '#fff',
      fontSize: width * 0.028
    }
  })
  return { styles }
}
