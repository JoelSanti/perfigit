import ThemeSwitch from '@/components/ui/theme-switch/ThemeSwitch'
import { useEffect, useState } from 'react'

export const Navbar = () => {
  const [theme, setTheme] = useState('mytheme')

  useEffect(() => {
    const localTheme = localStorage.getItem('theme') || 'mytheme'
    setTheme(localTheme)
  }, [])

  const handleToggleTheme = (e: any) => {
    if (e.target.checked) {
      setTheme('dark')
    } else {
      setTheme('mytheme')
    }
  }

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.querySelector('html')!.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className='navbar rounded-lg bg-neutral text-neutral-content shadow-lg'>
      <div className='flex-1'>
        <a className='btn btn-ghost text-xl'>PerfiGit</a>
      </div>
      <ThemeSwitch handleToggleTheme={handleToggleTheme} />
      <div className='flex-none'>
        <a className='btn btn-outline text-neutral-content' href=''>
          Explorar
        </a>
      </div>
    </div>
  )
}
