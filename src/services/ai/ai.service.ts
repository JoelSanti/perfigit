import { LV_IA_MODEL } from '@/constants/config.constant'
import { LV_API_GROQ_ENDPOINT } from '@/constants/urls.constant'
import { Payload } from '@/interfaces/ui/props/payload.interface'
import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'

export class AiService {
  private AIClient: ReturnType<typeof createOpenAI>
  private LV_MODEL: string

  constructor() {
    this.AIClient = this.getAIClient()
    this.LV_MODEL = LV_IA_MODEL
  }

  private getAIClient = (): ReturnType<typeof createOpenAI> => {
    return createOpenAI({
      baseURL: LV_API_GROQ_ENDPOINT,
      apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
    })
  }

  public getProfileMarkdown = async (
    prompt: string,
    system: string
  ): Promise<Payload<string>> => {
    let data = null
    let message = ''
    let is_done = false
    let payload: Payload<string> = {
      data,
      message,
      is_done,
    }

    try {
      const { text } = await generateText({
        model: this.AIClient(this.LV_MODEL),
        prompt,
        system,
      })

      data = text
      message = 'Se generó el perfil correctamente'
      is_done = true
    } catch (error) {
      message = `Error al generar el perfil: ${error}`
    }

    payload = {
      data,
      message,
      is_done,
    }

    return payload
  }
}
