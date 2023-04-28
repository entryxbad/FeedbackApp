import React from 'react'
import { Controller } from 'react-hook-form'
import { TextInput, Text } from 'react-native'
import { StyleSheet, useWindowDimensions } from 'react-native'

export const PassInput = ({
  control,
  errors,
  name,
  rules,
  defaultValues,
  ...rest
}) => {
  const { styles } = useStyle()

  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange } }) => (
          <TextInput
            {...rest}
            style={styles.input}
            secureTextEntry={true}
            placeholder='Пароль'
            autoCapitalize='none'
            onChangeText={(text) => onChange(text)}
          />
        )}
        name={name}
        rules={rules}
        defaultValue={defaultValues}
      />
      {errors[name] && (
        <Text style={{ color: 'red', fontSize: 21 }}>
          {errors[name].type === 'required'
            ? 'Это поле обязательно для заполнения'
            : 'Неверный пароль'}
        </Text>
      )}
    </>
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
