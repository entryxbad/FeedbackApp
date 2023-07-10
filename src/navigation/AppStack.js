import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '../screens/HomeScreen'
import { Quiz } from '../Quiz'
import { ThankYou } from '../ThankYou'
import { LoginScreen } from '../screens/LoginScreen'
import { LogoutScreen } from '../screens/LogoutScreen'

const Stack = createNativeStackNavigator()

export const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Questions' component={Quiz} />
      <Stack.Screen name='Thankyou' component={ThankYou} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Logout' component={LogoutScreen} />
    </Stack.Navigator>
  )
}
