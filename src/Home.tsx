import React, {useContext} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {AuthContext} from './context/AuthContext';

export const Home = ({navigation}) => {
  const {logout} = useContext(AuthContext);
  const {styles} = useStyle();

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Questions')}>
        <Text style={styles.title}>Начать опрос</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          logout();
        }}>
        <Text style={styles.title}>Выход</Text>
      </TouchableOpacity>
    </View>
  );
};

const useStyle = () => {
  const {height, width} = useWindowDimensions();
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
    button: {
      backgroundColor: '#456ede',
      borderWidth: 2,
      borderRadius: width * 0.01,
      borderColor: '#afbbdb',
      width: width * 0.5,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 5,
    },
    title: {
      fontSize: width * 0.02,
      padding: 10,
      color: '#ffff',
    },
  });
  return {styles};
};
