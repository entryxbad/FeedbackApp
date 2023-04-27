import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from './context/AuthContext'
import LinearGradient from 'react-native-linear-gradient'
import { useForm, Controller } from 'react-hook-form'
import { PhoneInputField } from './validation/phone_input/PhoneInputField'

export const LogIn = () => {
  const [phone, setPhone] = useState('')
  const { styles } = useStyle()
  const { login } = useContext(AuthContext)
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    login(data.username, data.password)
  }

  return (
    <LinearGradient
      colors={['#009be5', '#eaeff2', '#1976d3']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView style={styles.wrapper} behavior='padding'>
          <Text style={styles.headerText}>Войдите в учётную запись</Text>
          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <PhoneInputField
                control={control}
                errors={errors}
                name='phone'
                rules={{ required: true }}
                defaultValue=''
              />
            )}
            name='phone'
            rules={{ required: true }}
            defaultValue=''
          />
          {errors.username && (
            <Text style={styles.errorText}>
              Это поле обязательно для заполнения
            </Text>
          )}

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder='Пароль'
                autoCapitalize='none'
                value={value}
                onBlur={onBlur}
                onChangeText={(text) => onChange(text)}
              />
            )}
            name='password'
            rules={{ required: true }}
            defaultValue=''
          />
          {errors.password && (
            <Text style={styles.errorText}>
              Это поле обязательно для заполнения
            </Text>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>Войти</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
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
    },
    errorText: {
      color: 'red'
    }
  })
  return { styles }
}
