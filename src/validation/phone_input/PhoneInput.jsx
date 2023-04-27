import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import MaskInput from 'react-native-mask-input'
import { Text } from 'react-native'

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
    if (unmaskedValue.length > 0 && unmaskedValue[0] === '8') {
      setPhone(
        '+7 ' +
          unmaskedValue.slice(1, 4) +
          ' ' +
          unmaskedValue.slice(4, 7) +
          '-' +
          unmaskedValue.slice(7, 9) +
          '-' +
          unmaskedValue.slice(9, 11)
      )
    } else {
      setPhone(maskedValue)
    }
  }

  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange } }) => (
          <MaskInput
            {...rest}
            value={phone}
            placeholder='+7 (___) ___-__-__'
            keyboardType='numeric'
            onChangeText={(masked, unmasked) => {
              handleChange(masked, unmasked)
              onChange(unmasked)
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
        <Text style={{ color: 'red' }}>
          Это поле обязательно для заполнения
        </Text>
      )}
    </>
  )
}