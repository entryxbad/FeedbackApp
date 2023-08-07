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
    <View
      className='flex-1 items-center justify-center'
      style={{ backgroundColor: robotData?.backgroundColor }}
    >
      <Text
        className='text-4xl'
        style={{ color: robotData?.fontColor || '#000' }}
      >
        Спасибо за ваши ответы!
      </Text>
    </View>
  )
}
