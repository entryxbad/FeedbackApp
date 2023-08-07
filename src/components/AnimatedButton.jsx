import { Text, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable'

const AnimatedButton = ({ onPress, buttonStyle, textStyle, text, style }) => {
  return (
    <TouchableOpacity onPress={onPress} className={buttonStyle} style={style}>
      <Animatable.View
        animation={'pulse'}
        easing={'ease-in-out'}
        iterationCount={'infinite'}
        className='w-[95%] justify-center items-center bg-[#1a75d4] rounded-2xl'
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
