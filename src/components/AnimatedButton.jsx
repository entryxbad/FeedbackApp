import { useEffect, useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable'

import { loadRobotDataFromStorage } from '../utils/storageUtils'

const AnimatedButton = ({ onPress, buttonStyle, textStyle, text, style }) => {
  const [robotData, setRobotData] = useState(null)

  useEffect(() => {
    const fetchRobotData = async () => {
      const data = await loadRobotDataFromStorage()
      setRobotData(data)
    }
    fetchRobotData()
  }, [])

  return (
    <TouchableOpacity onPress={onPress} className={buttonStyle} style={style}>
      <Animatable.View
        animation={'pulse'}
        easing={'ease-in-out'}
        iterationCount={'infinite'}
        className={`w-[95%] justify-center items-center rounded-2xl ${(style = {
          backgroundColor: robotData?.buttonColor || '#1a75d4',
          color: robotData?.fontColor || '#fff'
        })}}`}
        style={style}
      >
        <Text className={textStyle} style={style}>
          {text}
        </Text>
      </Animatable.View>
    </TouchableOpacity>
  )
}

export default AnimatedButton
