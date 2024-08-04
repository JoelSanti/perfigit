import { Container } from './containers/Container'
import { Navbar } from './navbar/Navbar'

function CustomLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header>
        <Container className='mt-8 flex h-20 items-center'>
          <Navbar />
        </Container>
      </header>
      <Container className='my-8'>{children}</Container>
    </>
  )
}

export default CustomLayout
