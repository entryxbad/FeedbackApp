import React, { useContext } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import LinearGradient from 'react-native-linear-gradient'

export const HomeScreen = ({ navigation }) => {
  const { logout } = useContext(AuthContext)

  return (
    <LinearGradient
      colors={['#009be5', '#eaeff2', '#1976d3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <View className='flex-1 w-full h-full items-center justify-center px-64'>
        {/* Button start */}
        <TouchableOpacity
          className='bg-[#1a75d4] items-center rounded-2xl w-full'
          onPress={() => navigation.navigate('Questions')}
        >
          <Text className='text-white text-4xl py-4'>Начать опрос</Text>
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
