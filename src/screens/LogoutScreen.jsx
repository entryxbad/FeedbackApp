import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import Button from '../components/Button'
import { AuthContext } from '../context/AuthContext'
import { loadRobotDataFromStorage } from '../utils/storageUtils'
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
        <View className='flex-1 justify-center items-center'>
          <Text className='text-white text-6xl'>Выход из учётной записи</Text>

          <PassInput
            control={control}
            errors={errors}
            name='password'
            rules={{ required: true }}
          />

          {/* Button exit */}
          <Button
            onPress={handleSubmit(handleLogout)}
            buttonStyle={
              'rounded-2xl w-[40%] mt-7 items-center bg-white shadow-lg'
            }
            textStyle={'text-4xl p-4 text-[#5175ed]'}
            text={'Выйти'}
          />

          {/* Back button */}
          <Button
            onPress={() => navigation.navigate('Home')}
            buttonStyle={
              'w-[40%] items-center mt-8 rounded-2xl bg-white shadow-lg'
            }
            textStyle={'text-4xl p-4 text-[#5175ed]'}
            text={'Назад'}
          />
        </View>
      </TouchableWithoutFeedback>
    </LinearGradient>
  )
}
