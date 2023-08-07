import { Text, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable'

const AnimatedButton = ({ onPress, buttonStyle, textStyle, text }) => {
  return (
    <TouchableOpacity onPress={onPress} className={buttonStyle}>
      <Animatable.View
        animation={'pulse'}
        easing={'ease-in-out'}
        iterationCount={'infinite'}
        className='w-[95%] justify-center items-center bg-[#1a75d4] rounded-2xl'
      >
        <Text className={textStyle}>{text}</Text>
      </Animatable.View>
    </TouchableOpacity>
  )
}

export default AnimatedButton
