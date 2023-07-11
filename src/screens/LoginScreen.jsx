import React, { useContext } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import { AuthContext } from '../context/AuthContext'
import LinearGradient from 'react-native-linear-gradient'
import { useForm, Controller } from 'react-hook-form'
import { PhoneInputField } from '../validation/phone_input/PhoneInputField'
import { PassInputField } from '../validation/pass_input/PassInputField'

export const LoginScreen = () => {
  const { login } = useContext(AuthContext)
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    const phone = data.phone
    const password = data.password

    if (!phone || phone.length < 10 || !password || password.length < 6) {
      return
    }

    login(phone, password)
    console.log(phone, password)
  }

  return (
    <LinearGradient
      colors={['#009be5', '#eaeff2', '#1976d3']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className='flex-1 items-center justify-center'>
          <Text className='text-black text-6xl'>Войдите в учётную запись</Text>
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
                  required: true,
                  minLength: { value: 6, message: 'Неверный пароль' }
                }}
                defaultValue=''
              />
            )}
            name='password'
            rules={{ required: true }}
            defaultValue=''
          />

          <TouchableOpacity
            className='bg-[#1a75d4] w-[40%]
            mt-7 rounded-2xl items-center'
            onPress={handleSubmit(onSubmit)}
          >
            <Text className='text-white text-4xl p-4'>Войти</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </LinearGradient>
  )
}
