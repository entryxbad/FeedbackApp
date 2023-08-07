import { useContext, useEffect, useState } from 'react'
import { Image, View } from 'react-native'

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
    <View
      className='flex-1 items-center justify-center'
      style={{ backgroundColor: robotData?.backgroundColor }}
    >
      {/* Logo //FIXME*/}
      <View className='flex-1 absolute items-center justify-center'>
        <Image
          className='w-full h-full object-cover'
          source={{
            uri: `https://robominds.soft-servis.ru/${robotData?.logo}`
          }}
        />
      </View>
      {/* Button start */}
      <AnimatedButton
        onPress={() => navigation.navigate('Questions')}
        buttonStyle={
          'absolute items-center rounded-2xl border-l-2 border-r-2 border-t-4 w-[60%] py-1'
        }
        textStyle={'text-4xl py-4'}
        text={'Начать опрос'}
        style={{
          borderColor: robotData?.buttonColor || '#1a75d4',
          color: robotData?.fontColor || '#000'
        }}
      />
      {/* Button exit */}
      <Button
        onPress={() => navigation.navigate('Logout')}
        text={'Выйти из аккаунта'}
        buttonStyle={'top-56'}
        textStyle={'text-4xl py-4 px-4'}
        style={{
          color: robotData?.fontColor || '#000',
          backgroundColor: robotData?.buttonColor || '#1a75d4',
          borderRadius: 20
        }}
      />
    </View>
  )
}

// onPress={() => { Выйти из аккаунта
//   logout();
// }}
