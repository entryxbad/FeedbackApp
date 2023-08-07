import AsyncStorage from '@react-native-async-storage/async-storage'

// Функция для загрузки данных из AsyncStorage

const loadRobotDataFromStorage = async () => {
  try {
    const robotDataString = await AsyncStorage.getItem('robotData')
    if (robotDataString) {
      const parsedData = JSON.parse(robotDataString)
      return parsedData
    }
  } catch (error) {
    console.log('Ошибка при загрузке данных из AsyncStorage', error)
  }
}

export { loadRobotDataFromStorage }
