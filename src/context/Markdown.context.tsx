'use client'

import { LV_INITIAL_MARKDOWW } from '@/constants/ui.constant'
import { useToast } from '@/hooks/useToast.hook'
import { UseMarkdownProps } from '@/interfaces/ui/props/use-markdown.interface'
import { AiService } from '@/services/ai/ai.service'
import { GithubService } from '@/services/github/github.service'
import { createContext, useState, ReactNode } from 'react'
import { templates } from './utils/templates'

export const MarkdownContext = createContext<UseMarkdownProps | undefined>(
  undefined
)

export const MarkdownProvider = ({ children }: { children: ReactNode }) => {
  const [markdown, setMarkdown] = useState<string>(LV_INITIAL_MARKDOWW)
  const [isMarkdownLoading, setIsMarkdownLoading] = useState<boolean>(false)
  const [isShowMarkdownCode, setisShowMarkdownCode] = useState<boolean>(false)
  const { showToast } = useToast()

  const generateMarkdownCode = async (
    githubUsername: string
  ): Promise<void> => {
    setIsMarkdownLoading(true)

    const markdownPrompt = getMarkdownPrompt()
    const markdownSystem = await getMarkdownSystem(githubUsername)

    if (!markdownPrompt || !markdownSystem) {
      return
    }

    const aiService = new AiService()
    const { data, message, is_done } = await aiService.getProfileMarkdown(
      markdownPrompt,
      markdownSystem
    )

    if (!data || !is_done) {
      setIsMarkdownLoading(false)
      return showToast(message)
    }

    if (data.includes('```')) {
      const markdownMatch = data.match(/```(?:markdown)?\n([\s\S]*?)\n```/)
      const markdown = markdownMatch ? markdownMatch[1] : ''
      setMarkdown(markdown)
    } else {
      setMarkdown(data)
    }

    setIsMarkdownLoading(false)
  }

  const getMarkdownPrompt = (): string => {
    const _LV_MARKDOWN_PROMPT = `
    Crea un perfil de GitHub README en formato Markdown. El contenido debe ser moderno, visualmente atractivo y en español.

    1. *Ejemplos*: Usa cualquiera de los ejemplos proporcionados como base:

    ${templates}

    Puedes usar todas las herramientas que encuentres en los ejemplos, usando la información del usuario.

    2. *Sección de presentación*: Añade un título "Sobre mí" con un icono representativo. Incluye una descripción corta de ti y tu ubicación, si vas a incluir el avatar que esté centrado y con bordes redondeados, usa espacios entre la imagen y el texto para que se vea bien.

    3. *Sección de Tecnologías*: Añade un título "Tecnologías" con un icono representativo. Muestra las tecnologías en un contenedor horizontal usando badges o iconos atractivos de shields.io. En caso de mostrar más de una tecnología, asegúrate de que estén bien alineadas y tengan un buen espaciado.

    4. *Contacto e Información Adicional*: Proporciona formas de contacto, como email y enlaces a redes sociales. En caso de mostrar más de un enlace, asegúrate de que estén bien alineados y tengan un buen espaciado.

    5. *Estadisticas de Github y lenguajes mas usados*: Puedes usar las herramientas de estadística y graficos para darle un mejor estilo siempre y cuando esten ligadas al perfil de github correcto proporcionado por el usuario. En caso de mostrar más de un gráfico, asegúrate de que estén bien alineados y tengan un buen espaciado.

    Recuerda, la respuesta debe contener solo el perfil completo en formato Markdown, sin ningún texto adicional.
    `
    return _LV_MARKDOWN_PROMPT
  }

  const getMarkdownSystem = async (
    githubUsername: string
  ): Promise<string | void> => {
    const trimmedUsername = githubUsername.trim()
    const githubService = new GithubService(trimmedUsername)
    const { data, message, is_done } = await githubService.getGithubUser()

    if (!data || !is_done) {
      setIsMarkdownLoading(false)
      return showToast(message)
    }

    const { login, avatar_url, location, email } = data
    const listTopTechnology = await githubService.listGithubTopTechnology()

    const _LV_MARKDOWN_SYSTEM = `
    1. Información del Usuario:

    - Nombre: ${login || 'Ingrese aquí su nombre'}
    - Avatar: ${avatar_url || 'Ingrese aquí la URL de su avatar'}
    - Ubicación: ${location || 'Ingrese aquí su ubicación'}
    - Email: ${email || 'Ingrese aquí su email'}
    - Tecnologías - Bytes: ${listTopTechnology.join(', ') || 'Ingrese aquí sus tecnologías'}
    - GitHub Username: ${trimmedUsername || 'Ingrese aquí su nombre de usuario de GitHub'}
    - GitHub URL: ${trimmedUsername ? `https://github.com/${trimmedUsername}` : 'Ingrese aquí la URL de su perfil de GitHub'}

    2. Formato de Respuesta:
    Devuelve el perfil en formato markdown sin ningún texto adicional.
    `

    return _LV_MARKDOWN_SYSTEM
  }

  const toggleMarkdownPreview = (): void =>
    setisShowMarkdownCode(!isShowMarkdownCode)

  return (
    <MarkdownContext.Provider
      value={{
        markdown,
        setMarkdown,
        isMarkdownLoading,
        isShowMarkdownCode,
        toggleMarkdownPreview,
        generateMarkdownCode,
      }}
    >
      {children}
    </MarkdownContext.Provider>
  )
}
