import React, { useState } from 'react'
import { isNumber } from '../../utils/FormUtil'

interface NumberInputProps {
  id: string
  label: string
  initialValue: string
  numberSetter: React.Dispatch<React.SetStateAction<number>>
  min: number | null
  max: number | null
}

export default function NumberInput({
  id,
  label,
  initialValue,
  numberSetter,
  min,
  max
}: NumberInputProps) {
  const [hasInvalidInput, setHasInvalidInput] = useState(false)
  const [formValue, setFormValue] = useState(initialValue)

  function onFloatChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target.value
    const parsedInput = Number(input)
    setFormValue(input)
    if (isNumber(input) && isMinValue(parsedInput) && isMaxValue(parsedInput)) {
      if (hasInvalidInput) {
        setHasInvalidInput(false)
      }
      numberSetter(parsedInput)
    } else {
      setHasInvalidInput(true)
    }
  }

  function isMinValue(parsedInput: number): boolean {
    return !!(!min || (min && min <= parsedInput))
  }

  function isMaxValue(parsedInput: number): boolean {
    return !!(!max || (max && max >= parsedInput))
  }

  return (
    <label htmlFor={id} className="col-12">
      {label}
      <input
        id={id}
        type="text"
        value={formValue}
        className={hasInvalidInput ? 'form-input__error' : ''}
        onChange={event => {
          onFloatChange(event)
        }}
      />
    </label>
  )
}
