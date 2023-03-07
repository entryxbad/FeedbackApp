/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import {Quiz} from './src/Quiz';
import {Home} from './src/Home';
import {ThankYou} from './src/ThankYou';
import {useSender} from './src/hooks';
import {LogIn} from './src/LogIn';
import {AuthProvider} from './src/AuthContext';

function App() {
  useSender();

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LogIn"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Questions" component={Quiz} />
          <Stack.Screen name="Thankyou" component={ThankYou} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
