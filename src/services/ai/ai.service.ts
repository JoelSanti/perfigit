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
    let is_done = false
    let message = ''

    try {
      const { text: data } = await generateText({
        model: this.AIClient(this.LV_MODEL),
        prompt,
        system,
      })

      message = 'Se generó el perfil correctamente'
      is_done = true
      const payload = {
        data,
        message,
        is_done,
      }

      return payload
    } catch (error) {
      message = `Error al generar el perfil: ${error}`

      const payload = {
        data: null,
        message,
        is_done,
      }

      return payload
    }
  }
}
