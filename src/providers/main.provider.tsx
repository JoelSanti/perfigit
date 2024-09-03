import { GithubUsernameProvider } from '@/context/GIthubUsername.context'
import { MarkdownProvider } from '@/context/Markdown.context'
import { MarkdownScrollProvider } from '@/context/MarkdownScroll.context'
import { ToastProvider } from '@/context/Toast.context'
import { ReactNode } from 'react'

export const MainProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ToastProvider>
      <MarkdownScrollProvider>
        <MarkdownProvider>
          <GithubUsernameProvider>{children}</GithubUsernameProvider>
        </MarkdownProvider>
      </MarkdownScrollProvider>
    </ToastProvider>
  )
}
