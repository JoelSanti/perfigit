import { GithubUser } from '@/interfaces/github/github-user.interface'

export class GetGithubUserService {
  private endpoint: string
  private username: string

  constructor(endpoint: string, username: string) {
    this.endpoint = endpoint
    this.username = username
  }

  execute = async (): Promise<GithubUser> => {
    const url = `${this.endpoint}/users/${this.username}`

    try {
      const response = await fetch(url)
      const data = await response.json()
      return data
    } catch (error) {
      throw new Error('Failed to fetch GetGithubUser')
    }
  }
}
