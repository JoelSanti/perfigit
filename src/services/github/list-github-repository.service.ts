import { GithubRepository } from '@/interfaces/github/github-repository.interface'

export class ListGithubRepositoryService {
  private endpoint: string
  private username: string

  constructor(endpoint: string, username: string) {
    this.endpoint = endpoint
    this.username = username
  }

  execute = async (): Promise<GithubRepository[]> => {
    const url = `${this.endpoint}/users/${this.username}/repos`

    try {
      const response = await fetch(url)
      const data = await response.json()
      return data
    } catch (error) {
      throw new Error('Failed to fetch ListGithubRepository')
    }
  }
}
