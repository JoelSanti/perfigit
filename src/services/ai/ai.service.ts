import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'

export class AiService {
  private AIClient: ReturnType<typeof createOpenAI>
  private LV_MODEL: string

  constructor() {
    this.AIClient = this.getAIClient()
    this.LV_MODEL = 'llama3-8b-8192'
  }

  private getAIClient = (): ReturnType<typeof createOpenAI> => {
    return createOpenAI({
      baseURL: 'https://api.groq.com/openai/v1',
      apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
    })
  }

  public getProfileMarkdown = async (
    prompt: string,
    system: string
  ): Promise<string> => {
    const { text } = await generateText({
      model: this.AIClient(this.LV_MODEL),
      prompt,
      system,
    })

    return text
  }
}
