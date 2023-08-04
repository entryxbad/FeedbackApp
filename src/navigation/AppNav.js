import { NavigationContainer } from '@react-navigation/native'
import { useContext } from 'react'

import Preloader from '../components/Preloader'
import { AuthContext } from '../context/AuthContext'
import { AppStack } from './AppStack'
import { AuthStack } from './AuthStack'

export const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext)

  if (isLoading) {
    return <Preloader />
  }

  return (
    <NavigationContainer>
      {userToken !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}
