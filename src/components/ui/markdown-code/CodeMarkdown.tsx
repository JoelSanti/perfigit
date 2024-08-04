'use client'

import React, { useState } from 'react'
import { ClipboardIcon, GoBackIcon } from '@/components/icons'
import { useMarkdown } from '@/hooks/useMarkdown.hooks'

export const MarkdownCode: React.FC = () => {
  const { markdown, setMarkdown, toggleMarkdownPreview } = useMarkdown()
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (e: React.MouseEvent) => {
    e.preventDefault()

    navigator.clipboard.writeText(markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <>
      <div className='h-full bg-slate-800 lg:w-1/2'>
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
        <textarea
          value={markdown}
          onChange={({ target }) => setMarkdown(target.value)}
          className='h-full w-full border-none bg-slate-800 px-10 pb-10 pt-5 focus:outline-none focus:ring-0'
        />
      </div>
    </>
  )
}
