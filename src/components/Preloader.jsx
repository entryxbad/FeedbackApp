import { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { loadRobotDataFromStorage } from '../utils/storageUtils'

const Preloader = () => {
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
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size={50} color={'white'} />
        <Text className='text-3xl py-5 text-white'>
          Идет загрузка данных...
        </Text>
      </View>
    </LinearGradient>
  )
}

export default Preloader
