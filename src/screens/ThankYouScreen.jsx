import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'

import { Thanks } from '../utils/images'
import { loadRobotDataFromStorage } from '../utils/storageUtils'

export const ThankYou = ({ navigation }) => {
  const [robotData, setRobotData] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home')
    }, 3000)
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
        <Animatable.Image
          animation={'wobble'}
          duration={3000}
          easing={'ease-in-out'}
          iterationCount={'infinite'}
          source={Thanks}
          className='w-full h-96 object-cover absolute top-0 left-1'
          resizeMode='contain'
        />

        <Text className='mt-32 text-4xl text-white font-RoundedNormal'>
          Спасибо за ваш отзыв! Ждём вас снова &#128522;
        </Text>
      </View>
    </LinearGradient>
  )
}
