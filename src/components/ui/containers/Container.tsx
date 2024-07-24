import { ContainerProps } from '@/interfaces/ui/container-props.interface'
import React from 'react'

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`container mx-auto px-4 sm:px-6 md:px-8 ${className}`}>
      {children}
    </div>
  )
}
