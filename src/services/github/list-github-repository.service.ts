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
    const LV_TOP_REPOSITORY = 4

    try {
      const response = await fetch(url)
      const data = await response.json()

      const sortedData = await this.listSortedRepository(data)
      const listGithubRepository = sortedData.slice(0, LV_TOP_REPOSITORY)

      return listGithubRepository
    } catch (error) {
      throw new Error('Failed to fetch ListGithubRepository')
    }
  }

  listSortedRepository = async (
    data: GithubRepository[]
  ): Promise<GithubRepository[]> => {
    const sortedRepositoryList = data.sort((repositoryA, repositoryB) => {
      const repositoryAUpdatedAt = new Date(repositoryA.updated_at).getTime()
      const repositoryBUpdatedAt = new Date(repositoryB.updated_at).getTime()

      return repositoryBUpdatedAt - repositoryAUpdatedAt
    })

    return sortedRepositoryList
  }
}
