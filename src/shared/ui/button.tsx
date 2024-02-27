import { cn } from '@shared/utils'
import React from 'react'

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode
}

export const Button = ({ children, className, ...rest }: Props) => {
  return (
    <button
      {...rest}
      className={cn(
        'bg-primary rounded-3xl px-4 py-3 font-semibold text-white shadow transition-colors',
        className
      )}
    >
      {children}
    </button>
  )
}
