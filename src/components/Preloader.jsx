import { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

import { loadRobotDataFromStorage } from '../utils/storageUtils'

const Preloader = () => {
  const [robotData, setRobotData] = useState(null)

  useEffect(() => {
    const fetchRobotData = async () => {
      const data = await loadRobotDataFromStorage()
      setRobotData(data)
    }
    fetchRobotData()
  }, [])

  return (
    <View
      className='flex-1 justify-center items-center'
      style={{ backgroundColor: robotData?.backgroundColor }}
    >
      <ActivityIndicator size={50} color={robotData?.fontColor || '#000'} />
      <Text
        className='text-3xl py-5'
        style={{
          color: robotData?.fontColor || '#000'
        }}
      >
        Идет загрузка данных...
      </Text>
    </View>
  )
}

export default Preloader
