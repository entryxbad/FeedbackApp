import { Controller } from 'react-hook-form'

import { PassInput } from './PassInput'

export const PassInputField = ({
  control,
  errors,
  name,
  rules,
  defaultValue
}) => {
  return (
    <Controller
      control={control}
      render={() => (
        <PassInput
          control={control}
          errors={errors}
          name={name}
          rules={{ required: true }}
        />
      )}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
    />
  )
}
