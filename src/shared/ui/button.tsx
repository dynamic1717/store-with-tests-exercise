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
        'rounded-3xl bg-primary px-4 py-3 font-semibold text-white shadow transition-colors disabled:cursor-not-allowed disabled:bg-primary/30',
        className
      )}
    >
      {children}
    </button>
  )
}
