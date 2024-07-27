'use client'
import {
  CodeMarkdown,
  Container,
  GithubForm,
  MarkDownPreview,
  Navbar,
} from '@/components'
import useMarkdown from '@/hooks/useMarkdown.hook'
import { useState } from 'react'

export default function Home() {
  const [showCodeMarkdown, setshowCodeMarkdown] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [markdown, setMarkdown] = useMarkdown()

  const toggleMarkdownPreview = () => {
    setshowCodeMarkdown(!showCodeMarkdown)
  }
  const handleSubmit = (value: string) => {
    setIsLoading(true)
    console.log(value)
  }

  return (
    <main>
      <header>
        <Container className='mt-8 flex h-20 items-center'>
          <Navbar />
        </Container>
      </header>
      <section>
        <Container className='mt-8'>
          <div className='p card h-[780px] overflow-hidden bg-neutral shadow-xl lg:card-side'>
            {showCodeMarkdown ? (
              <CodeMarkdown
                code={markdown}
                onCodeChange={setMarkdown}
                onClick={toggleMarkdownPreview}
              />
            ) : (
              <GithubForm
                onClick={toggleMarkdownPreview}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            )}
            {isLoading ? (
              <div className='skeleton h-full rounded-none lg:w-1/2'></div>
            ) : (
              <MarkDownPreview markdown={markdown} />
            )}
          </div>
        </Container>
      </section>
    </main>
  )
}
