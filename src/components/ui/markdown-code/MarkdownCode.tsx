'use client'

import { useRef, useState } from 'react'
import { ClipboardIcon, GoBackIcon } from '@/components/icons'
import { useMarkdown } from '@/hooks/useMarkdown.hooks'
import 'prismjs/themes/prism-tomorrow.min.css'
import Prism from 'prismjs'
import 'prismjs/components/prism-markdown'

export const MarkdownCode: React.FC = () => {
  const { markdown, setMarkdown, toggleMarkdownPreview } = useMarkdown()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const highlightedMarkdownRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (e: React.MouseEvent) => {
    e.preventDefault()

    navigator.clipboard.writeText(markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const highlightedMarkdown = Prism.highlight(
    markdown,
    Prism.languages.markdown,
    'markdown'
  )

  const handleScroll = () => {
    const textarea = textareaRef.current
    const highlightedMarkdown = highlightedMarkdownRef.current

    if (textarea && highlightedMarkdown) {
      highlightedMarkdown.scrollTop = textarea.scrollTop
      highlightedMarkdown.scrollLeft = textarea.scrollLeft
    }
  }

  return (
    <>
      <div className='h-full overflow-clip bg-slate-800 lg:w-1/2'>
        <div className='relative flex justify-end gap-2 pr-2 pt-2'>
          <button
            onClick={copyToClipboard}
            className='btn btn-outline btn-primary'
          >
            <GoBackIcon />
          </button>
          <button
            className='btn btn-outline btn-primary'
            onClick={() => toggleMarkdownPreview()}
          >
            <ClipboardIcon />
          </button>
          {copied && (
            <span
              style={{ position: 'absolute', top: 15, right: 130 }}
              className='rounded-lg bg-accent px-2 py-1 text-black'
            >
              Copiado
            </span>
          )}
        </div>
        <div className='relative h-full w-full'>
          <div
            ref={highlightedMarkdownRef}
            className='pointer-events-none absolute left-0 top-0 h-full w-full overflow-auto whitespace-pre-wrap px-10 pb-24 pt-5 text-white'
            dangerouslySetInnerHTML={{ __html: highlightedMarkdown }}
          />
          <textarea
            ref={textareaRef}
            value={markdown}
            onChange={({ target }) => setMarkdown(target.value)}
            onScroll={handleScroll}
            className='absolute left-0 top-0 h-full w-full resize-none border-none bg-transparent px-10 pb-24 pt-5 text-transparent caret-white focus:outline-none focus:ring-0'
          />
        </div>
      </div>
    </>
  )
}
