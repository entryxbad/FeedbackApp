import React from 'react'
import { Controller } from 'react-hook-form'
import { PhoneInput } from './PhoneInput'
import { useWindowDimensions, StyleSheet } from 'react-native'

export const PhoneInputField = ({
  control,
  errors,
  name,
  rules,
  defaultValue
}) => {
  const { styles } = useStyle()

  return (
    <Controller
      control={control}
      render={() => (
        <PhoneInput
          control={control}
          errors={errors}
          name='phone'
          rules={{ required: true }}
          style={styles.input}
        />
      )}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
    />
  )
}

const useStyle = () => {
  const { height, width } = useWindowDimensions()

  const styles = StyleSheet.create({
    input: {
      width: width * 0.4,
      height: height * 0.08,
      borderWidth: 2,
      borderRadius: width * 0.01,
      borderColor: '#B3B3B3',
      marginTop: 30,
      padding: 10,
      fontSize: width * 0.015
    }
  })
  return { styles }
}
