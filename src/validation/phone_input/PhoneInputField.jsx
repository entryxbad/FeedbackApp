import React from 'react'
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
          className='border-2 border-[#B3B3B3] rounded-xl w-[40%] text-xl mt-8 p-3'
        />
      )}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
    />
  )
}
