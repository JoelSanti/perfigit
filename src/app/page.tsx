'use client'
import { MarkdownCode, GithubForm, MarkDownPreview } from '@/components'
import useMarkdown from '@/hooks/useMarkdown.hook'
import { useState } from 'react'

export default function Home() {
  const [showMarkdownCode, setshowMarkdownCode] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { markdown, setMarkdown } = useMarkdown()
  const [inputValue, setInputValue] = useState<string>('')

  const toggleMarkdownPreview = () => {
    setshowMarkdownCode(!showMarkdownCode)
  }
  const handleSubmit = (value: string) => {
    setIsLoading(true)
    console.log(value)
    setIsLoading(false)
  }

  return (
    <main>
      <section>
        <div className='p card h-[780px] overflow-hidden bg-neutral shadow-xl lg:card-side'>
          {showMarkdownCode ? (
            <MarkdownCode
              code={markdown}
              onCodeChange={setMarkdown}
              onClick={toggleMarkdownPreview}
            />
          ) : (
            <GithubForm
              onClick={toggleMarkdownPreview}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              inputValue={inputValue}
              onInputChange={setInputValue}
            />
          )}
          {isLoading ? (
            <div className='skeleton h-full rounded-none lg:w-1/2'></div>
          ) : (
            <MarkDownPreview markdown={markdown} />
          )}
        </div>
      </section>
    </main>
  )
}
