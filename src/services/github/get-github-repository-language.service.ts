import { GithubLanguage } from '@/interfaces/github/github-language.interface'

export class GetGithubRepositoryLanguageService {
  private endpoint: string
  private username: string

  constructor(endpoint: string, username: string) {
    this.endpoint = endpoint
    this.username = username
  }

  execute = async (repositoryName: string): Promise<GithubLanguage> => {
    const url = `${this.endpoint}/repos/${this.username}/${repositoryName}/languages`

    try {
      const response = await fetch(url)
      const data = await response.json()
      return data
    } catch (error) {
      throw new Error('Failed to fetch GetGithubRepositoryLanguage')
    }
  }
}
