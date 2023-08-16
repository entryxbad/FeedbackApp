import { Controller } from 'react-hook-form'
import { Text, TextInput } from 'react-native'

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
            className='border-2 border-white rounded-xl p-3 text-xl w-[40%] mt-8 text-white font-RoundedNormal'
            secureTextEntry={true}
            placeholder='Пароль'
            placeholderTextColor={'white'}
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
