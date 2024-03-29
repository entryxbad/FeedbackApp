import { Controller } from 'react-hook-form'

import { PhoneInput } from './PhoneInput'

export const PhoneInputField = ({
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
        <PhoneInput
          control={control}
          errors={errors}
          name={name}
          rules={{ required: true }}
          className='border-2 border-white rounded-xl w-[40%] text-xl mt-8 p-3 text-white font-RoundedNormal'
        />
      )}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
    />
  )
}
