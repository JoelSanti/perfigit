export interface ToastProps {
  isToastVisible: boolean
  toastMessage: string
  showToast: (message: string) => void
}
