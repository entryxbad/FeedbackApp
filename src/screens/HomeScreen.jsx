import { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import AnimatedButton from '../components/AnimatedButton'
import Button from '../components/Button'
import { AuthContext } from '../context/AuthContext'
import { loadRobotDataFromStorage } from '../utils/storageUtils'

export const HomeScreen = ({ navigation }) => {
  const { logout } = useContext(AuthContext)
  const [robotData, setRobotData] = useState(null) // Состояние для хранения данных из AsyncStorage

  useEffect(() => {
    const fetchRobotData = async () => {
      const data = await loadRobotDataFromStorage()
      setRobotData(data)
    }
    fetchRobotData()
  }, [])

  return (
    <LinearGradient
      colors={['#009be5', '#eaeff2', '#1976d3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <View className='flex-1 items-center justify-center'>
        {/* Button start */}

        <AnimatedButton
          onPress={() => navigation.navigate('Questions')}
          buttonStyle={
            'absolute items-center rounded-2xl border-l-2 border-r-2 border-t-4 w-[60%] py-1'
          }
          textStyle={'text-4xl py-4'}
          text={'Начать опрос'}
          style={{
            borderColor: robotData?.backgroundColor || '#1a75d4',
            color: robotData?.fontColor || '#fff'
          }}
        />

        {/* Button exit */}
        <Button
          onPress={() => navigation.navigate('Logout')}
          text={'Выйти из аккаунта'}
          buttonStyle={'top-56'}
          textStyle={'text-4xl py-4 px-4'}
          style={{
            color: robotData?.fontColor || '#fff',
            backgroundColor: robotData?.backgroundColor || '#1a75d4',
            borderRadius: 10
          }}
        />
      </View>
    </LinearGradient>
  )
}

// onPress={() => { Выйти из аккаунта
//   logout();
// }}
