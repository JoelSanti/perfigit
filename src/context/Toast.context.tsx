'use client'

import { ToastProps } from '@/interfaces/ui/props/use-toast.interface'
import { createContext, ReactNode, useState } from 'react'

export const ToastContext = createContext<ToastProps | undefined>(undefined)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>('')

  const showToast = (message: string) => {
    setToastMessage(message)
    setIsToastVisible(true)

    setTimeout(() => {
      setIsToastVisible(false)
    }, 3500)
  }

  return (
    <ToastContext.Provider value={{ isToastVisible, toastMessage, showToast }}>
      {children}
    </ToastContext.Provider>
  )
}
