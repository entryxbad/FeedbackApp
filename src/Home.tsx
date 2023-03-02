import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {StyleSheet} from 'react-native';

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
  button: {
    backgroundColor: '#456ede',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#afbbdb',
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    padding: 10,
    color: '#ffff',
  },
});

export const Home = ({navigation}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Questions')}>
        <Text style={styles.title}>Начать опрос</Text>
      </TouchableOpacity>
    </View>
  );
};
