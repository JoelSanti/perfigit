import { GithubRepository } from '@/interfaces/github/github-repository.interface'
import { ListGithubRepositoryService } from './list-github-repository.service'
import { ListSortedDataService } from './utils/list-sorted-data.service'
import { LVFramework } from '@/interfaces/github/github-lv-framework.interface'
import { Framework } from '@/interfaces/github/github-framework.interface'
import { FileContent } from '@/interfaces/github/github-file-content.interface'

export class ListGithubTopFrameworkService {
  private endpoint: string
  private username: string
  private LV_FRAMEWORK_OBJECT: LVFramework

  private ListGithubRepositoryService: ListGithubRepositoryService
  private ListSortedDataService: ListSortedDataService

  constructor(endpoint: string, username: string) {
    this.endpoint = endpoint
    this.username = username
    this.LV_FRAMEWORK_OBJECT = {
      'package.json': ['react', 'next', 'vue', 'angular', 'svelte'],
      'requirements.txt': ['django', 'flask', 'fastapi'],
      'pubspec.yaml': ['flutter'],
    }

    this.ListGithubRepositoryService = new ListGithubRepositoryService(
      this.endpoint,
      this.username
    )
    this.ListSortedDataService = new ListSortedDataService()
  }

  execute = async (): Promise<[string, number][]> => {
    const repositoryList: GithubRepository[] =
      await this.ListGithubRepositoryService.execute()
    const frameworkObject: Framework = {}
    const LV_TOP_FRAMEWORK = 5

    for (const repository of repositoryList) {
      for (const [file, frameworkList] of Object.entries(
        this.LV_FRAMEWORK_OBJECT
      )) {
        const content = await this.getFileContent(repository, file)

        if (!content) continue

        const contentLength = content.length

        for (const framework of frameworkList) {
          if (!frameworkObject[framework]) {
            frameworkObject[framework] = 0
          }
          if (content.includes(framework)) {
            frameworkObject[framework] += contentLength
          }
        }
      }
    }
    const listTopFramework = this.ListSortedDataService.execute(
      frameworkObject,
      LV_TOP_FRAMEWORK
    )

    return listTopFramework
  }

  getFileContent = async (
    repository: GithubRepository,
    path: string
  ): Promise<string | null> => {
    try {
      const url = `${repository.url}/contents/${path}`
      const response = await fetch(url)
      const { content }: FileContent = await response.json()

      if (!content) return null

      return Buffer.from(content, 'base64').toString('utf-8')
    } catch (error) {
      throw new Error('Failed to fetch getFileContent')
    }
  }
}
