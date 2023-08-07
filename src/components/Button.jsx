import { Text, TouchableOpacity } from 'react-native'

const Button = ({ onPress, buttonStyle, textStyle, text }) => {
  return (
    <TouchableOpacity onPress={onPress} className={buttonStyle}>
      <Text className={textStyle}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button
