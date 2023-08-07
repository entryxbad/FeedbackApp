import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native'

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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        className='flex-1 justify-center items-center'
        style={{ backgroundColor: robotData?.backgroundColor }}
      >
        <Text
          className='text-black text-6xl'
          style={{ color: robotData?.fontColor }}
        >
          Выход из учётной записи
        </Text>

        <PassInput
          control={control}
          errors={errors}
          name='password'
          rules={{ required: true }}
        />

        {/* Button exit */}

        <Button
          onPress={handleSubmit(handleLogout)}
          buttonStyle={'rounded-2xl w-[40%] mt-7 items-center'}
          textStyle={'text-4xl p-4'}
          text={'Выйти'}
          style={{
            color: robotData?.fontColor || '#fff',
            backgroundColor: robotData?.buttonColor || '#1a75d4'
          }}
        />

        {/* Back button */}
        <Button
          onPress={() => navigation.navigate('Home')}
          buttonStyle={'w-[40%] items-center mt-8 rounded-2xl'}
          textStyle={'text-4xl p-4'}
          text={'Назад'}
          style={{
            color: robotData?.fontColor || '#fff',
            backgroundColor: robotData?.buttonColor || '#1a75d4'
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}
