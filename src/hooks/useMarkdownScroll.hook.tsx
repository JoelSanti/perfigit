'use client'

import { MarkdownScrollContext } from '@/context/MarkdownScroll.context'
import { MarkdownScrollProps } from '@/interfaces/ui/props/use-markdown-scroll.interface'
import { useContext } from 'react'

export const useMarkdownScroll = (): MarkdownScrollProps => {
  const context = useContext(MarkdownScrollContext)

  if (context === undefined) {
    throw new Error(
      'useMarkdownScroll must be used within a useMarkdownScrollProvider'
    )
  }

  return context
}
