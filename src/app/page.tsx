'use client'
import {
  CodeMarkdown,
  Container,
  FormGithub,
  MarkdownPreview,
  NavBar,
} from '@/components'
import { useEffect, useState } from 'react'

export default function Home() {
  const [markdown, setMarkdown] = useState<string>('')
  const [showCodeMarkdown, setshowCodeMarkdown] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const githubProfile =
      '<div style="display: flex; justify-content: center; align-items: center; height: 100%;">\n\n' +
      '# BIENVENIDO A PERFIGIT\n\n' +
      '</div>'

    setMarkdown(githubProfile)
  }, [])
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
          <NavBar />
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
              <FormGithub
                onClick={toggleMarkdownPreview}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            )}
            {isLoading ? (
              <div className='skeleton h-full rounded-none lg:w-1/2'></div>
            ) : (
              <MarkdownPreview markdown={markdown} />
            )}
          </div>
        </Container>
      </section>
    </main>
  )
}
