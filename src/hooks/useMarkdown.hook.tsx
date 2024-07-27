import { useEffect, useState, Dispatch, SetStateAction } from 'react'

const useMarkdown = (): [string, Dispatch<SetStateAction<string>>] => {
  const [markdown, setMarkdown] = useState<string>('')

  useEffect(() => {
    const githubProfile =
      '<div style="display: flex; justify-content: center; align-items: center; height: 100%;">\n\n' +
      '# BIENVENIDO A PERFIGIT\n\n' +
      '</div>'

    setMarkdown(githubProfile)
  }, [])

  return [markdown, setMarkdown]
}

export default useMarkdown
