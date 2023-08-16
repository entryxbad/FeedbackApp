import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { loadRobotDataFromStorage } from '../utils/storageUtils'

export const ThankYou = ({ navigation }) => {
  const [robotData, setRobotData] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home')
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      <View className='flex-1 items-center justify-center'>
        <Text className='text-4xl text-white'>Спасибо за ваши ответы!</Text>
      </View>
    </LinearGradient>
  )
}
