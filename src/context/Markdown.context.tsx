'use client'

import { UseMarkdownProps } from '@/interfaces/ui/props/use-markdown.interface'
import { AiService } from '@/services/ai/ai.service'
import { GithubService } from '@/services/github/github.service'
import { createContext, useState, ReactNode } from 'react'

export const MarkdownContext = createContext<UseMarkdownProps | undefined>(
  undefined
)

export const MarkdownProvider = ({ children }: { children: ReactNode }) => {
  const LV_INITIAL_MARKDOWW =
    '<div style="display: flex; justify-content: center; align-items: center; height: 100%;">\n\n' +
    '# BIENVENIDO A PERFIGIT\n\n' +
    '</div>'

  const [markdown, setMarkdown] = useState<string>(LV_INITIAL_MARKDOWW)
  const [isMarkdownLoading, setIsMarkdownLoading] = useState<boolean>(false)
  const [isShowMarkdownCode, setisShowMarkdownCode] = useState<boolean>(false)

  const generateMarkdownCode = async (
    githubUsername: string
  ): Promise<void> => {
    setIsMarkdownLoading(true)

    const markdownPrompt = getMarkdownPrompt()
    const markdownSystem = await getMarkdownSystem(githubUsername)

    const aiService = new AiService()
    const githubProfileMarkdown = await aiService.getProfileMarkdown(
      markdownPrompt,
      markdownSystem
    )

    setMarkdown(githubProfileMarkdown)
    setIsMarkdownLoading(false)
  }

  const getMarkdownPrompt = (): string => {
    const VL_MARKDOWN_PROMPT = `
    Crea un perfil de GitHub README en formato markdown que sea moderno y visualmente atractivo. Aquí tienes las directrices.

    1. **Banner Personalizado**:
      - Crea una descripción breve en base a la información del usuario.
      - Añade un banner personalizado en la parte superior. El banner debe contener el nombre del usuario y su descripción breve. Usa un contenedor con bordes redondeados y un fondo degradado con colores contrastantes.
      - Ejemplo de HTML para el banner:
        <div style="border-radius: 10px; background: linear-gradient(to right, #ff7e5f, #feb47b); padding: 20px; text-align: center;">
          <h1 style="color: #fff;">{nombre del usuario}</h1>
          <p style="color: #fff;">{descripción del usuario}</p>
        </div>

    2. **Sección de Tecnologías**:
      - Añade un título **## Tecnologías 🛠**.
      - Muestra las tecnologías en un contenedor flex horizontal usando badges o iconos atractivos. Utiliza shields.io para los badges.
      - Ejemplo de contenedor de tecnologías:

        ## Tecnologías 🛠
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;">
          ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
          ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
          ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=white)
          ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
          ![Node.js](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)
          ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
        </div>

    3. **Descripción y Proyectos Destacados**:
      - Incluye una breve sección de **Sobre mí** donde se describa al usuario de manera más detallada.
      - Añade una sección de **Proyectos Destacados** donde se resalten algunos proyectos importantes del usuario con una breve descripción y enlaces a los repositorios.

    4. **Contacto e Información Adicional**:
      - Proporciona formas de contacto, como email y enlaces a redes sociales.
      - Ejemplo:
        ## Contacto
        <div style="display: flex; justify-content: center; gap: 20px;">
          <a href="mailto:{email del usuario}"><img src="https://img.shields.io/badge/email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"></a>
          <a href="https://www.linkedin.com/in/{linkedin del usuario}"><img src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
          <a href="https://github.com/{github del usuario}"><img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"></a>
        </div>

    Devuelve el perfil en formato markdown sin ningún texto adicional.
    `
    return VL_MARKDOWN_PROMPT
  }

  const getMarkdownSystem = async (githubUsername: string): Promise<string> => {
    const githubService = new GithubService(githubUsername)

    const { login, avatar_url, location, email } =
      await githubService.getGithubUser()
    const listTopTechnology = await githubService.listGithubTopTechnology()

    const VL_MARKDOWN_SYSTEM = `
    ## Información del Usuario
    - Nombre: ${login}
    - Avatar: ${avatar_url}
    - Ubicación: ${location}
    - Email: ${email}
    - Tecnologías - Bytes: ${listTopTechnology.join(', ')}
    ## Formato de Respuesta
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
