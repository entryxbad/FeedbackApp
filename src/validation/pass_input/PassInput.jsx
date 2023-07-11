import React from 'react'
import { Controller } from 'react-hook-form'
import { TextInput, Text } from 'react-native'

export const PassInput = ({
  control,
  errors,
  name,
  rules,
  defaultValues,
  ...rest
}) => {
  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange } }) => (
          <TextInput
            {...rest}
            className='border-2 border-[#B3B3B3] rounded-xl p-3 text-xl w-[40%] mt-8'
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
