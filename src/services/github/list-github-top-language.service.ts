import { ListGithubRepositoryService } from './list-github-repository.service'
import { GetGithubRepositoryLanguageService } from './get-github-repository-language.service'
import { GithubRepository } from '@/interfaces/github/github-repository.interface'
import { GithubLanguage } from '@/interfaces/github/github-language.interface'

export class ListGithubTopLanguageService {
  private ListGithubRepositoryService: ListGithubRepositoryService
  private GetGithubRepositoryLanguageService: GetGithubRepositoryLanguageService

  constructor(endpoint: string, username: string) {
    this.ListGithubRepositoryService = new ListGithubRepositoryService(
      endpoint,
      username
    )
    this.GetGithubRepositoryLanguageService =
      new GetGithubRepositoryLanguageService(endpoint, username)
  }

  execute = async (): Promise<[string, number][]> => {
    const repositoryList: GithubRepository[] =
      await this.ListGithubRepositoryService.execute()
    const languageObject: GithubLanguage = {}

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
    const listTopLanguage = this.getSortedLanguages(languageObject)

    return listTopLanguage
  }

  private getSortedLanguages = (
    languageObject: GithubLanguage
  ): [string, number][] => {
    const LV_TOP_LANGUAGES = 5

    const languageList = Object.entries(languageObject)
    const sortedLanguages = languageList.sort(
      (languageA, languageB) => languageB[1] - languageA[1]
    ) as [string, number][]

    return sortedLanguages.slice(0, LV_TOP_LANGUAGES)
  }
}
