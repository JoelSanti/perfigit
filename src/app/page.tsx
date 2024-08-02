'use client'
import {
  CodeMarkdown,
  Container,
  GithubForm,
  MarkDownPreview,
  Navbar,
} from '@/components'
import useMarkdown from '@/hooks/useMarkdown.hook'
import { getCodeProfileMarkdown } from '@/libs/graph'
import { useState } from 'react'

export default function Home() {
  const [showCodeMarkdown, setshowCodeMarkdown] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { markdown, setMarkdown } = useMarkdown()

  const toggleMarkdownPreview = () => {
    setshowCodeMarkdown(!showCodeMarkdown)
  }
  const generateMarkdownCode = async (userProfileGit: string) => {
    setIsLoading(true)

    const params = `Informacion de usuario:${userProfileGit}`
    const githubProfileMarkdown = await getCodeProfileMarkdown(params)

    setMarkdown(githubProfileMarkdown)
    setIsLoading(false)
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
                onSubmit={generateMarkdownCode}
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
