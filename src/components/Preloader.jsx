import { ActivityIndicator, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const Preloader = () => {
  return (
    <LinearGradient
      colors={['#009be5', '#fff', '#1976d3']}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size={50} color={'#1a75d4'} />
        <Text className='color-black text-3xl py-5'>
          Идет загрузка данных...
        </Text>
      </View>
    </LinearGradient>
  )
}

export default Preloader
