import React, { useContext } from 'react'
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import { AuthContext } from './context/AuthContext'
import LinearGradient from 'react-native-linear-gradient'
import { useForm, Controller } from 'react-hook-form'
import { PhoneInputField } from './validation/phone_input/PhoneInputField'
import { PassInputField } from './validation/pass_input/PassInputField'

export const LogIn = () => {
  const { styles } = useStyle()
  const { login } = useContext(AuthContext)
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    const phone = data.phone

    if (phone && phone.length < 10) {
      return
    }

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
            render={() => (
              <PhoneInputField
                control={control}
                errors={errors}
                name='phone'
                rules={{
                  required: true,
                  minLength: {
                    value: 10,
                    message: 'Некорректный номер телефона'
                  }
                }}
                defaultValue=''
              />
            )}
            name='phone'
            rules={{
              required: true,
              minLength: { value: 10, message: 'Некорректный номер телефона' }
            }}
            defaultValue=''
          />

          <Controller
            control={control}
            render={() => (
              <PassInputField
                control={control}
                errors={errors}
                name='password'
                rules={{
                  required: true
                }}
                defaultValue=''
              />
            )}
            name='password'
            rules={{ required: true }}
            defaultValue=''
          />

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
