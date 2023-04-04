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
      <View style={styles.block}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Questions')}>
          <Text style={styles.title}>Начать опрос</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.block}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Logout')}
          style={styles.buttonExit}>
          <Text style={styles.title}>Выйти из аккаунта</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// onPress={() => { Выйти из аккаунта
//   logout();
// }}

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
    buttonExit: {
      backgroundColor: '#B00000',
      borderWidth: 2,
      borderRadius: width * 0.01,
      borderColor: '#afbbdb',
      width: width * 0.3,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 5,
    },
    title: {
      fontSize: width * 0.028,
      padding: 10,
      color: '#ffff',
    },
    block: {
      paddingTop: width * 0.2,
    },
  });
  return {styles};
};
