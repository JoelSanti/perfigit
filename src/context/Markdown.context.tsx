'use client'

import { LV_INITIAL_MARKDOWW } from '@/constants/ui.constant'
import { useToast } from '@/hooks/useToast.hook'
import { UseMarkdownProps } from '@/interfaces/ui/props/use-markdown.interface'
import { AiService } from '@/services/ai/ai.service'
import { GithubService } from '@/services/github/github.service'
import { createContext, useState, ReactNode } from 'react'

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

    setMarkdown(data)
    setIsMarkdownLoading(false)
  }

  const getMarkdownPrompt = (): string => {
    const VL_MARKDOWN_PROMPT = `
    Crea un perfil de GitHub README en formato markdown que sea moderno y visualmente atractivo. Aquí tienes las directrices.

    1. Banner Personalizado:
      - Crea una descripción breve en base a la información del usuario.
      - Añade un banner personalizado en la parte superior. El banner debe contener el nombre del usuario y su descripción breve. Usa un contenedor con bordes redondeados y un fondo degradado con colores contrastantes y minimalistas.

    2. Sección de Tecnologías:
      - Añade un título Técnologias junto a un icono representativo.
      - Muestra las tecnologías en un contenedor flex horizontal usando badges o iconos atractivos. Utiliza shields.io para los badges.

    3. Contacto e Información Adicional:
      - Proporciona formas de contacto, como email y enlaces a redes sociales.

    La respuesta debe contener el perfil completo en formato markdown sin ningún texto adicional.
    `
    return VL_MARKDOWN_PROMPT
  }

  const getMarkdownSystem = async (
    githubUsername: string
  ): Promise<string | void> => {
    const githubService = new GithubService(githubUsername)
    const { data, message, is_done } = await githubService.getGithubUser()

    if (!data || !is_done) {
      setIsMarkdownLoading(false)
      return showToast(message)
    }

    const { login, avatar_url, location, email } = data
    const listTopTechnology = await githubService.listGithubTopTechnology()

    const VL_MARKDOWN_SYSTEM = `
    1. Información del Usuario:
    - Nombre: ${login}
    - Avatar: ${avatar_url}
    - Ubicación: ${location}
    - Email: ${email}
    - Tecnologías - Bytes: ${listTopTechnology.join(', ')}
    2. Formato de Respuesta:
    Devuelve el perfil en formato markdown sin ningún texto adicional.
    `

    return VL_MARKDOWN_SYSTEM
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
