import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native/Libraries/Components/TextInput/TextInput';

export const Logout = () => {
  return (
    <View>
      <Text>Введите пароль</Text>
      <TextInput placeholder="Пароль"></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({});
