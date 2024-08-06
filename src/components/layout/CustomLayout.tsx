'use client'

import { useToast } from '@/hooks/useToast.hook'
import { Container } from './containers/Container'
import { Navbar } from './navbar/Navbar'
import Toast from './toast/Toast'

function CustomLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isToastVisible, toastMessage } = useToast()

  return (
    <>
      <header>
        <Container className='mt-8 flex h-20 items-center'>
          <Navbar />
        </Container>
      </header>
      <Container className='my-8'>{children}</Container>
      {isToastVisible && <Toast message={toastMessage} />}
    </>
  )
}

export default CustomLayout
