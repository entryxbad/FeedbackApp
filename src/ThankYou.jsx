import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

export const ThankYou = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home')
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <LinearGradient
      colors={['#009be5', '#fff', '#1976d3']}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <View className='flex-1 items-center justify-center'>
        <Text className='text-black text-4xl'>Спасибо за ваши ответы!</Text>
      </View>
    </LinearGradient>
  )
}
