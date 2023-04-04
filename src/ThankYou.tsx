import React, {useEffect} from 'react';
import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';

export const ThankYou = ({navigation}) => {
  const {styles} = useStyle();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Спасибо за ваши ответы!</Text>
    </View>
  );
};

const useStyle = () => {
  const {width, height} = useWindowDimensions();

  const styles = StyleSheet.create({
    wrapper: {
      display: 'flex',
      backgroundColor: '#112e80',
      justifyContent: 'center',
      alignItems: 'center',
      width: width,
      height: height,
      padding: 5,
    },
    title: {
      fontSize: width * 0.028,
      padding: 10,
      color: '#ffff',
    },
  });
  return {styles};
};
