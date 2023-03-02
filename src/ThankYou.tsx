import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    backgroundColor: '#112e80',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: 5,
  },
  title: {
    fontSize: 25,
    padding: 10,
    color: '#ffff',
  },
});

export const ThankYou = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('LogIn');
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Спасибо за ваши ответы!</Text>
    </View>
  );
};
