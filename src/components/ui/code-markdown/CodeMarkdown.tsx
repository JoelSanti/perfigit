import React, { useState } from 'react'
import { CodeMarkdownProps } from '@/interfaces/ui/props/code-markdown.interface'
import { ClipboardIcon, GoBackIcon } from '../../icons'

export const CodeMarkdown: React.FC<CodeMarkdownProps> = ({
  code,
  onCodeChange,
  onClick,
}) => {
  const [copied, setCopied] = useState(false)

  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onCodeChange(event.target.value)
  }
  const copyToClipboard = (e: React.MouseEvent) => {
    e.preventDefault()

    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <>
      <div className='relative h-full lg:w-1/2'>
        <button
          onClick={copyToClipboard}
          style={{ position: 'absolute', top: 10, right: 74 }}
          className='btn btn-outline btn-primary'
        >
          <GoBackIcon />
        </button>
        <button
          style={{ position: 'absolute', top: 10, right: 10 }}
          className='btn btn-outline btn-primary'
          onClick={onClick}
        >
          <ClipboardIcon />
        </button>
        {copied && (
          <span
            style={{ position: 'absolute', top: 15, right: 135 }}
            className='rounded-lg bg-accent px-2 py-1 text-black'
          >
            Copiado
          </span>
        )}
        <textarea
          value={code}
          onChange={handleCodeChange}
          className='h-full w-full border-none bg-slate-800 p-10 focus:outline-none focus:ring-0'
        />
      </div>
    </>
  )
}
