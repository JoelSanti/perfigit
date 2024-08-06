import { GithubUser } from '@/interfaces/github/github-user.interface'
import { Payload } from '@/interfaces/ui/props/payload.interface'

export class GetGithubUserService {
  private endpoint: string
  private username: string

  constructor(endpoint: string, username: string) {
    this.endpoint = endpoint
    this.username = username
  }

  execute = async (): Promise<Payload<GithubUser>> => {
    const url = `${this.endpoint}/users/${this.username}`
    let message = ''
    let is_done = false

    try {
      const response = await fetch(url)
      const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining')
      const resetTime = response.headers.get('X-RateLimit-Reset')

      if (response.status === 403 && rateLimitRemaining === '0') {
        const resetTimeDate = new Date(Number(resetTime) * 1000)

        const message = `Solicitudes excedidas.\nIntente nuevamente después de ${resetTimeDate.toLocaleTimeString()}`
        const payload: Payload<GithubUser> = {
          data: null,
          message,
          is_done,
        }

        return payload
      }

      const data: GithubUser = await response.json()

      message = 'Se obtuvo el usuario de Github correctamente'
      is_done = true
      const payload = {
        data,
        message,
        is_done,
      }

      return payload
    } catch (error) {
      const message = `Error al obtener el usuario de Github: ${error}`

      const payload: Payload<GithubUser> = {
        data: null,
        message,
        is_done,
      }

      return payload
    }
  }
}
