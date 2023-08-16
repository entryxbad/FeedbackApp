import { useContext, useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import AnimatedButton from '../components/AnimatedButton'
import Button from '../components/Button'
import { AuthContext } from '../context/AuthContext'
import { loadRobotDataFromStorage } from '../utils/storageUtils'

export const HomeScreen = ({ navigation }) => {
  const { logout } = useContext(AuthContext)
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
      <View className='flex-1 relative'>
        {/* Logo */}
        <View className='flex-row relative p-4 justify-center'>
          <Image
            className='w-96 h-80 object-cover rounded-2xl'
            source={{
              uri: `https://robominds.soft-servis.ru/${robotData?.logo}`
            }}
          />
        </View>

        <View className='flex-col items-center justify-center mt-5'>
          {/* Button start */}
          <AnimatedButton
            onPress={() => navigation.navigate('Questions')}
            buttonStyle={
              'absolute items-center rounded-2xl border-l-2 border-r-2 border-t-4 w-[60%] py-1 border-white'
            }
            textStyle={'text-4xl py-4 text-[#5175ed]'}
            text={'Начать опрос'}
          />

          {/* Button exit */}
          <Button
            onPress={() => navigation.navigate('Logout')}
            text={'Выйти из аккаунта'}
            buttonStyle={'top-56 rounded-2xl bg-white shadow-lg'}
            textStyle={'text-4xl py-4 px-4 text-[#5175ed]'}
          />
        </View>
      </View>
    </LinearGradient>
  )
}

// onPress={() => { Выйти из аккаунта
//   logout();
// }}
