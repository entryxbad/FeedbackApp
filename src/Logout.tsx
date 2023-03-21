import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from './context/AuthContext';

export const Logout = ({navigation}) => {
  const [password, setPassword] = useState('');
  const {styles} = useStyle();
  const {logout} = useContext(AuthContext);

  const handleLogout = () => {
    if (password === 'test') {
      logout();
      navigation.navigate('Login');
    } else {
      Alert.alert('Неверный пароль');
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.headerText}>Выход из учётной записи</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Введите пароль"
        value={password}
        onChangeText={setPassword}></TextInput>
      <TouchableOpacity style={styles.buttonExit} onPress={handleLogout}>
        <Text style={styles.buttonText}>Выйти</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Назад</Text>
      </TouchableOpacity>
    </View>
  );
};

const useStyle = () => {
  const {width, height} = useWindowDimensions();
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
      fontSize: width * 0.023,
    },
    input: {
      backgroundColor: '#fff',
      width: width * 0.3,
      borderRadius: width * 0.01,
      marginTop: 30,
      padding: 10,
    },
    button: {
      backgroundColor: '#456ede',
      borderWidth: 2,
      borderRadius: width * 0.01,
      borderColor: '#afbbdb',
      width: width * 0.3,
      padding: 10,
      marginTop: 30,
      alignItems: 'center',
    },
    buttonExit: {
      backgroundColor: '#B00000',
      borderWidth: 2,
      borderRadius: width * 0.01,
      borderColor: '#afbbdb',
      width: width * 0.3,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
      padding: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: width * 0.02,
    },
  });
  return {styles};
};
