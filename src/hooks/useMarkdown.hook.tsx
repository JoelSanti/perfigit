import { useEffect, useState } from 'react'
import { useMarkdownProps } from '@/interfaces/ui/props/use-markdown.interface'

const useMarkdown = (): useMarkdownProps => {
  const [markdown, setMarkdown] = useState<string>('')

  useEffect(() => {
    const githubProfile =
      '<div style="display: flex; justify-content: center; align-items: center; height: 100%;">\n\n' +
      '# BIENVENIDO A PERFIGIT\n\n' +
      '</div>'

    setMarkdown(githubProfile)
  }, [])

  return { markdown, setMarkdown }
}

export default useMarkdown
