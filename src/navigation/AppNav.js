import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import {AuthStack} from './AuthStack';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {AppStack} from './AppStack';

export const AppNav = () => {
  const {isLoading, userToken} = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={50}></ActivityIndicator>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
