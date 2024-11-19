import React from 'react'

export const Field: React.FC<React.ComponentProps<'div'>> = props => {
  return <div {...props} className='flex flex-col w-full items-stretch gap-2' />
}

export const FieldLabel: React.FC<React.ComponentProps<'label'>> = props => {
  return <label {...props} className='uppercase text-xs tracking-wide font-bold text-gray-400' />
}

export const Input: React.FC<React.ComponentProps<'input'>> = props => {
  return <input {...props} className='py-2 px-3 rounded-md bg-gray-100 text-sm' />
}

export const FieldError: React.FC<React.ComponentProps<'span'>> = props => {
  return (
    <span {...props} className='text-[11px] font-normal text-amber-600'>
      {props.children}
    </span>
  )
}
