import { ListGithubRepositoryService } from './list-github-repository.service'
import { GetGithubRepositoryLanguageService } from './get-github-repository-language.service'
import { GithubRepository } from '@/interfaces/github/github-repository.interface'
import { GithubLanguage } from '@/interfaces/github/github-language.interface'
import { ListSortedDataService } from './utils/list-sorted-data.service'

export class ListGithubTopLanguageService {
  private ListGithubRepositoryService: ListGithubRepositoryService
  private GetGithubRepositoryLanguageService: GetGithubRepositoryLanguageService
  private ListSortedDataService: ListSortedDataService

  constructor(endpoint: string, username: string) {
    this.ListGithubRepositoryService = new ListGithubRepositoryService(
      endpoint,
      username
    )
    this.GetGithubRepositoryLanguageService =
      new GetGithubRepositoryLanguageService(endpoint, username)
    this.ListSortedDataService = new ListSortedDataService()
  }

  execute = async (): Promise<[string, number][]> => {
    const repositoryList: GithubRepository[] =
      await this.ListGithubRepositoryService.execute()
    const languageObject: GithubLanguage = {}
    const LV_TOP_FRAMEWORK = 5

    for (const repository of repositoryList) {
      const repositoryName = repository.name
      const repositoryLanguageObject =
        await this.GetGithubRepositoryLanguageService.execute(repositoryName)
      const repositoryLanguageList = Object.entries(repositoryLanguageObject)

      for (const [language, bytes] of repositoryLanguageList) {
        if (languageObject[language]) {
          languageObject[language] += bytes
        } else {
          languageObject[language] = bytes
        }
      }
    }
    const listTopLanguage = this.ListSortedDataService.execute(
      languageObject,
      LV_TOP_FRAMEWORK
    )

    return listTopLanguage
  }
}
