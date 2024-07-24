import React, { useState } from 'react'
import { CodeMarkdownProps } from '@/interfaces/ui/code-markdown-props.interface'

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
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z'
            />
          </svg>
        </button>
        <button
          style={{ position: 'absolute', top: 10, right: 10 }}
          className='btn btn-outline btn-primary'
          onClick={onClick}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3'
            />
          </svg>
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
