'use client'

import { GithubUsernameContext } from '@/context/GIthubUsername.context'
import { GithubUsernameProps } from '@/interfaces/ui/props/github-username.interface'
import { useContext } from 'react'

export const useGithubUsername = (): GithubUsernameProps => {
  const context = useContext(GithubUsernameContext)

  if (context === undefined) {
    throw new Error(
      'useGithubUsername must be used within a useGithubUsernameProvider'
    )
  }

  return context
}
