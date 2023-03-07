import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../Home';
import {Quiz} from '../Quiz';
import {ThankYou} from '../ThankYou';

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Questions" component={Quiz} />
      <Stack.Screen name="Thankyou" component={ThankYou} />
    </Stack.Navigator>
  );
};
