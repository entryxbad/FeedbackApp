import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { Text } from 'react-native'
import MaskInput from 'react-native-mask-input'

export const PhoneInput = ({
  control,
  errors,
  name,
  rules,
  defaultValue,
  ...rest
}) => {
  const [phone, setPhone] = useState(defaultValue)

  const handleChange = (maskedValue, unmaskedValue) => {
    let formattedValue = unmaskedValue.replace(/\D/g, '')

    if (formattedValue.length > 0) {
      if (formattedValue[0] === '8') {
        formattedValue = '+7' + formattedValue.slice(1)
      } else if (formattedValue[0] !== '7') {
        formattedValue = '+7' + formattedValue
      }
    }

    setPhone(formattedValue)
    return formattedValue
  }

  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <MaskInput
            {...rest}
            value={phone}
            placeholder='+7 (___) ___-__-__'
            placeholderTextColor={'white'}
            keyboardType='numeric'
            onChangeText={(masked, unmasked) => {
              const newValue = handleChange(masked, unmasked)
              onChange(newValue)
            }}
            mask={[
              '+',
              '7',
              ' ',
              '(',
              /\d/,
              /\d/,
              /\d/,
              ')',
              ' ',
              /\d/,
              /\d/,
              /\d/,
              '-',
              /\d/,
              /\d/,
              '-',
              /\d/,
              /\d/
            ]}
          />
        )}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
      />
      {errors[name] && (
        <Text style={{ color: 'red', fontSize: 21 }}>
          {errors[name].type === 'required'
            ? 'Это поле обязательно для заполнения'
            : 'Некорректный номер телефона'}
        </Text>
      )}
    </>
  )
}
