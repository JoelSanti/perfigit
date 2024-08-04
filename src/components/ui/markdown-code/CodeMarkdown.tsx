'use client'

import React, { useState } from 'react'
import { ClipboardIcon, GoBackIcon } from '@/components/icons'
import { MarkdownCodeProps } from '@/interfaces/ui/props/markdown-code.interface'

export const MarkdownCode: React.FC<MarkdownCodeProps> = ({
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
      <div className='h-full bg-slate-800 lg:w-1/2'>
        <div className='relative flex justify-end gap-2 pr-2 pt-2'>
          <button
            onClick={copyToClipboard}
            className='btn btn-outline btn-primary'
          >
            <GoBackIcon />
          </button>
          <button className='btn btn-outline btn-primary' onClick={onClick}>
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
          value={code}
          onChange={handleCodeChange}
          className='h-full w-full border-none bg-slate-800 px-10 pb-10 pt-5 focus:outline-none focus:ring-0'
        />
      </div>
    </>
  )
}
