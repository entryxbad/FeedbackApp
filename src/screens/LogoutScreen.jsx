import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  View
} from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import LinearGradient from 'react-native-linear-gradient'
import { useForm } from 'react-hook-form'
import { PassInput } from '../validation/pass_input/PassInput'

export const LogoutScreen = ({ navigation }) => {
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
        <View className='flex-1 justify-center items-center'>
          <Text className='text-black text-6xl'>Выход из учётной записи</Text>

          <PassInput
            control={control}
            errors={errors}
            name='password'
            rules={{ required: true }}
          />
          <TouchableOpacity
            className='border-2 border-[#1a75d4] rounded-2xl w-[40%] mt-7 items-center'
            onPress={handleSubmit(handleLogout)}
          >
            <Text className='text-[#1a75d4] text-4xl p-4'>Выйти</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className='bg-[#1a75d4] w-[40%] items-center mt-8 rounded-2xl'
            onPress={() => navigation.navigate('Home')}
          >
            <Text className='text-white text-4xl p-4'>Назад</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </LinearGradient>
  )
}
