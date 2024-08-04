import { MarkdownContext } from '@/context/Markdown.context'
import { UseMarkdownProps } from '@/interfaces/ui/props/use-markdown.interface'
import { useContext } from 'react'

export const useMarkdown = (): UseMarkdownProps => {
  const context = useContext(MarkdownContext)

  if (context === undefined) {
    throw new Error('useMarkdown must be used within a MarkdownProvider')
  }

  return context
}
