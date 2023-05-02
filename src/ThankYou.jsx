import React, { useEffect } from 'react'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

export const ThankYou = ({ navigation }) => {
  const { styles } = useStyle()

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home')
    }, 5000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <LinearGradient
      colors={['#009be5', '#fff', '#1976d3']}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <View style={styles.wrapper}>
        <Text style={styles.title}>Спасибо за ваши ответы!</Text>
      </View>
    </LinearGradient>
  )
}

const useStyle = () => {
  const { width, height } = useWindowDimensions()

  const styles = StyleSheet.create({
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: width,
      height: height,
      padding: 5
    },
    title: {
      fontSize: width * 0.028,
      padding: 10,
      color: '#000'
    }
  })
  return { styles }
}
