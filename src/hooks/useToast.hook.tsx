'use client'

import { ToastContext } from '@/context/Toast.context'
import { ToastProps } from '@/interfaces/ui/props/use-toast.interface'
import { useContext } from 'react'

export const useToast = (): ToastProps => {
  const context = useContext(ToastContext)

  if (context === undefined) {
    throw new Error('useToast must be used within a useToastProvider')
  }

  return context
}
