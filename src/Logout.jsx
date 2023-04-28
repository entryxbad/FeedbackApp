import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import LinearGradient from 'react-native-linear-gradient'
import { useForm } from 'react-hook-form'
import { PassInput } from './validation/pass_input/PassInput'

export const Logout = ({ navigation }) => {
  const { styles } = useStyle()
  const { logout } = useContext(AuthContext)
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      password: ''
    },
    mode: 'onSubmit'
  })

  const handleLogout = (data) => {
    if (data.password === 'test') {
      logout()
      navigation.navigate('Login')
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
        <KeyboardAvoidingView style={styles.wrapper} behavior='padding'>
          <Text style={styles.headerText}>Выход из учётной записи</Text>

          <PassInput
            control={control}
            errors={errors}
            name='password'
            rules={{ required: true }}
          />
          <TouchableOpacity
            style={styles.buttonExit}
            onPress={handleSubmit(handleLogout)}
          >
            <Text style={styles.buttonExitText}>Выйти</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Назад</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
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
