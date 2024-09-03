'use client'

import { MarkdownScrollProps } from '@/interfaces/ui/props/use-markdown-scroll.interface'
import { createContext, ReactNode, useState } from 'react'

export const MarkdownScrollContext = createContext<
  MarkdownScrollProps | undefined
>(undefined)

export const MarkdownScrollProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [scrollTop, setScrollTop] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const setScroll = (scrollTop: number, scrollLeft: number) => {
    setScrollTop(scrollTop)
    setScrollLeft(scrollLeft)
  }

  return (
    <MarkdownScrollContext.Provider
      value={{ scrollTop, scrollLeft, setScroll }}
    >
      {children}
    </MarkdownScrollContext.Provider>
  )
}
