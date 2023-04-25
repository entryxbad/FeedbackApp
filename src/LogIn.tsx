import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState, useContext} from 'react';
import MaskInput from 'react-native-mask-input';
import {AuthContext} from './context/AuthContext';

export const LogIn = () => {
  const {styles} = useStyle();
  const [phone, setPhone] = useState('');
  const {login} = useContext(AuthContext);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleChange = (masked, text) => {
    setPhone(masked);
    setUsername(text);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.wrapper}>
        <Text style={styles.headerText}>Войдите в учётную запись</Text>
        {/* <TextInput
        style={styles.input}
        placeholder="Логин"
        value={username}
        onChangeText={(text) => setUsername(text)}></TextInput> */}

        <MaskInput
          style={styles.input}
          value={phone}
          placeholder="Логин"
          keyboardType="numeric"
          onChangeText={handleChange}
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
          placeholder="Пароль"
          autoCapitalize="none"
          value={password}
          onChangeText={(text) => setPassword(text)}></TextInput>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            login(username, password);
          }}>
          <Text style={styles.buttonText}>Войти</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const useStyle = () => {
  const {height, width} = useWindowDimensions();

  const styles = StyleSheet.create({
    wrapper: {
      height: height,
      width: width,
      backgroundColor: '#112e80',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerText: {
      color: '#fff',
      fontSize: width * 0.05,
    },
    input: {
      backgroundColor: '#fff',
      width: width * 0.4,
      height: height * 0.08,
      borderRadius: width * 0.01,
      marginTop: 30,
      padding: 10,
      fontSize: width * 0.015,
    },
    button: {
      backgroundColor: '#456ede',
      borderWidth: 2,
      borderRadius: width * 0.01,
      borderColor: '#afbbdb',
      width: width * 0.4,
      padding: 10,
      marginTop: 30,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: width * 0.028,
    },
  });
  return {styles};
};
