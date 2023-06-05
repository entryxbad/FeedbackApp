import React, { useContext } from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  useWindowDimensions
} from 'react-native'
import { AuthContext } from './context/AuthContext'
import LinearGradient from 'react-native-linear-gradient'

export const Home = ({ navigation }) => {
  const { logout } = useContext(AuthContext)
  const { styles } = useStyle()

  return (
    <LinearGradient
      colors={['#009be5', '#eaeff2', '#1976d3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <View style={styles.wrapper}>
        <View style={styles.block}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Questions')}
          >
            <Text style={styles.title}>Начать опрос</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.block}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Logout')}
            style={styles.buttonExit}
          >
            <Text style={styles.titleExit}>Выйти из аккаунта</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  )
}

// onPress={() => { Выйти из аккаунта
//   logout();
// }}

const useStyle = () => {
  const { height, width } = useWindowDimensions()
  const styles = StyleSheet.create({
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: width,
      height: height,
      padding: 5
    },
    button: {
      backgroundColor: '#1a75d4',
      borderRadius: width * 0.01,
      width: width * 0.5,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 5
    },
    buttonExit: {
      borderRadius: width * 0.01,
      borderWidth: width * 0.002,
      borderColor: '#1a75d4',
      width: width * 0.3,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 5,
      color: 'black'
    },
    title: {
      fontSize: width * 0.03,
      padding: 10,
      color: '#ffff'
    },
    titleExit: {
      fontSize: width * 0.03,
      padding: 10,
      color: '#1a75d4'
    },
    block: {
      paddingTop: width * 0.2
    }
  })
  return { styles }
}
