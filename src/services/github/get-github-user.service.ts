import {
  LV_HTTP_STATUS_CODE,
  LV_SECONDS_TO_MILLISECONDS,
} from '@/constants/config.constant'
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

    let data = null
    let message = ''
    let is_done = false
    let payload: Payload<GithubUser> = {
      data,
      message,
      is_done,
    }

    try {
      const response = await fetch(url)
      const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining')
      const resetTime = response.headers.get('X-RateLimit-Reset')

      if (response.status === LV_HTTP_STATUS_CODE.NOT_FOUND) {
        message = 'Error al obtener el usuario de Github'
        return { ...payload, message }
      }

      if (
        response.status === LV_HTTP_STATUS_CODE.FORBIDDEN &&
        rateLimitRemaining === '0'
      ) {
        const resetTimeDate = new Date(
          Number(resetTime) * LV_SECONDS_TO_MILLISECONDS
        )
        message = `Solicitudes excedidas.\nIntente nuevamente después de ${resetTimeDate.toLocaleTimeString()}`
        return { ...payload, message }
      }

      data = await response.json()
      message = 'Se obtuvo el usuario de Github correctamente'
      is_done = true
    } catch (error) {
      message = `Error al obtener el usuario de Github: ${error}`
    }

    payload = {
      data,
      message,
      is_done,
    }

    return payload
  }
}
