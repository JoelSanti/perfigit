import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
})

export const getCodeProfileMarkdown = async (params: string) => {
  const { text } = await generateText({
    model: groq('llama3-8b-8192'),
    prompt: `Crea un perfil de GitHub README con la siguiente información: \n\n${params} puedes
    usar emojis y tambien html para que se vea esteticamente bien (recuerda que no necesitas encerrar el codigo html entre etiquetas html o especificar que es codigo, incrustarlo directamente),
    crea un contenedor en la parte superor para el nombre y una pequeña descripción, el contenedor debe de tener bordes redondeados y ocupar todo el eje y posible haz que los colores de texto y el fondo degradado contrasten entre si,
    luego debajo pon el título ## tecnologías (icono) para los iconos de tecnologias podrias usar: ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) y ponerlo dentro de una contenedor flex horizontal que ocupe todo el espacio posible ejemplo:
    
<div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 10px;">
  recuerda que debe de haber una linea en blanco aqui
  ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
  recuerda que debe de haber una linea en blanco aqui
  ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
  recuerda que debe de haber una linea en blanco aqui
  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=white)
  recuerda que debe de haber una linea en blanco aqui
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=white)
  recuerda que debe de haber una linea en blanco aqui
  ![Node.js](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)
  recuerda que debe de haber una linea en blanco aqui
  ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
  recuerda que debe de haber una linea en blanco aqui
</div>
    , por ultimo recuerda darme unicamente el perfil sin nigún texto adicional y recuerda no encerrar el codigo html con nada y tambien cuando pongas texto o iconos dentro de html deja un espacio arriba y abajo`,
  })

  return text
}
