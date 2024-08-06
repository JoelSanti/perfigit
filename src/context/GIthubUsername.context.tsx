'use client'

import { GithubUsernameProps } from '@/interfaces/ui/props/github-username.interface'
import { createContext, ReactNode, useState } from 'react'

export const GithubUsernameContext = createContext<
  GithubUsernameProps | undefined
>(undefined)

export const GithubUsernameProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [username, setUsername] = useState<string>('')

  return (
    <GithubUsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </GithubUsernameContext.Provider>
  )
}
