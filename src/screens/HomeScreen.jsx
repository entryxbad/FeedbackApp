import { useContext } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'

import AnimatedButton from '../components/AnimatedButton'
import Button from '../components/Button'
import { AuthContext } from '../context/AuthContext'

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

        <AnimatedButton
          onPress={() => navigation.navigate('Questions')}
          buttonStyle={
            'absolute items-center rounded-2xl w-[60%] border-l-2 border-r-2 border-t-4 border-[#1a75d4] py-1'
          }
          textStyle={'text-white text-4xl py-4'}
          text={'Начать опрос'}
        />

        {/* Button exit */}
        <Button
          onPress={() => navigation.navigate('Logout')}
          text={'Выйти из аккаунта'}
          buttonStyle={'border-2 border-[#1a75d4] rounded-2xl top-56'}
          textStyle={'text-[#1a75d4] text-4xl py-4 px-4'}
        />
      </View>
    </LinearGradient>
  )
}

// onPress={() => { Выйти из аккаунта
//   logout();
// }}
