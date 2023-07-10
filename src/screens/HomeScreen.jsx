import React, { useContext } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import LinearGradient from 'react-native-linear-gradient'
import * as Animatable from 'react-native-animatable'

export const HomeScreen = ({ navigation }) => {
  const { logout } = useContext(AuthContext)

  return (
    <LinearGradient
      colors={['#009be5', '#eaeff2', '#1976d3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <View className='flex-1 items-center justify-center'>
        {/* Button start */}
        <TouchableOpacity
          className='absolute items-center rounded-2xl w-[60%] border-l-2 border-r-2 border-t-4 border-[#1a75d4] py-1'
          onPress={() => navigation.navigate('Questions')}
        >
          <Animatable.View
            animation={'pulse'}
            easing={'ease-in-out'}
            iterationCount={'infinite'}
            className='w-[95%] justify-center items-center bg-[#1a75d4] rounded-2xl'
          >
            <Text className='text-white text-4xl py-4'>Начать опрос</Text>
          </Animatable.View>
        </TouchableOpacity>

        {/* Button exit */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Logout')}
          className='border-2 border-[#1a75d4] rounded-2xl top-56'
        >
          <Text className='text-[#1a75d4] text-4xl py-4 px-4'>
            Выйти из аккаунта
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

// onPress={() => { Выйти из аккаунта
//   logout();
// }}
