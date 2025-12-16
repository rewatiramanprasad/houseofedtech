import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
// import { Input } from './ui/input'
import {
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormReturn,
} from 'react-hook-form'
import { Textarea } from './ui/textarea'

type inputProps<T extends FieldValues> = {
  form: UseFormReturn<T>
  fieldName: Path<T>
  placeHolder: string
  rows?: number
  disabled?: boolean
}

function FormTextArea<T extends FieldValues>({
  form,
  fieldName,
  placeHolder,
  rows,
  disabled,
}: inputProps<T>) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }: { field: ControllerRenderProps<T, Path<T>> }) => (
        <FormItem>
          <FormLabel
            htmlFor={fieldName}
            className=" capitalize block text-sm font-medium text-gray-700 mb-2"
          >
            {fieldName}
          </FormLabel>
          <FormControl>
            <Textarea
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder={placeHolder}
              disabled={disabled}
              rows={rows}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormTextArea
