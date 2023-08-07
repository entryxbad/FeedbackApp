import { Text, TouchableOpacity } from 'react-native'

const Button = ({ onPress, buttonStyle, textStyle, text, style }) => {
  return (
    <TouchableOpacity onPress={onPress} className={buttonStyle} style={style}>
      <Text className={textStyle} style={style}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

export default Button
