import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import MaskInput from 'react-native-mask-input';

const LogIn = ({navigation}) => {
  const [phone, setPhone] = React.useState('');

  return (
    <View style={styles.wrapper}>
      <Text style={styles.headerText}>Войдите в учётную запись</Text>
      <MaskInput
        style={styles.input}
        value={phone}
        placeholder="Логин"
        keyboardType="numeric"
        onChangeText={(masked, unmasked) => {
          setPhone(masked); // you can use the unmasked value as well

          // assuming you typed "9" all the way:
          console.log(masked); // (99) 99999-9999
          console.log(unmasked); // 99999999999
        }}
        mask={[
          '+',
          '7',
          ' ',
          '(',
          /\d/,
          /\d/,
          /\d/,
          ')',
          ' ',
          /\d/,
          /\d/,
          /\d/,
          '-',
          /\d/,
          /\d/,
          '-',
          /\d/,
          /\d/,
        ]}
      />

      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Пароль"></TextInput>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Войти</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%',
    backgroundColor: '#112e80',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 25,
  },
  input: {
    backgroundColor: '#fff',
    width: '30%',
    borderRadius: 10,
    marginTop: 30,
    padding: 10,
  },
  button: {
    backgroundColor: '#456ede',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#afbbdb',
    width: '30%',
    padding: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});
