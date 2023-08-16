import { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import Button from '../components/Button'
import { AuthContext } from '../context/AuthContext'
import { loadRobotDataFromStorage } from '../utils/storageUtils'
import { PassInputField } from '../validation/pass_input/PassInputField'
import { PhoneInputField } from '../validation/phone_input/PhoneInputField'

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

  const [robotData, setRobotData] = useState(null)

  useEffect(() => {
    const fetchRobotData = async () => {
      const data = await loadRobotDataFromStorage()
      setRobotData(data)
    }
    fetchRobotData()
  }, [])

  return (
    <LinearGradient
      className='flex-1 relative'
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={['#3490f3', '#4283f1', '#5175ed']}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className='flex-1 items-center justify-center'>
          <Text className='text-white text-6xl'>Войдите в учётную запись</Text>
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

          {/* Button Enter */}
          <Button
            onPress={handleSubmit(onSubmit)}
            buttonStyle={
              'w-[40%] mt-7 rounded-2xl items-center bg-white shadow-lg'
            }
            textStyle={'text-4xl p-4 text-[#5175ed]'}
            text={'Войти'}
          />
        </View>
      </TouchableWithoutFeedback>
    </LinearGradient>
  )
}
