import { GithubUser } from '@/interfaces/github/github-user.interface'
import { GetGithubUserService } from './get-github-user.service'
import { ListGithubTopLanguageService } from './list-github-top-language.service'
import { ListGithubTopFrameworkService } from './list-github-top-framework.service'

export class GithubService {
  private endpoint: string
  private username: string

  private GetGithubUserService: GetGithubUserService
  private ListGithubTopLanguageService: ListGithubTopLanguageService
  private ListGithubTopFrameworkService: ListGithubTopFrameworkService

  constructor(username: string) {
    this.endpoint = 'https://api.github.com'
    this.username = username

    this.GetGithubUserService = new GetGithubUserService(
      this.endpoint,
      this.username
    )
    this.ListGithubTopLanguageService = new ListGithubTopLanguageService(
      this.endpoint,
      this.username
    )
    this.ListGithubTopFrameworkService = new ListGithubTopFrameworkService(
      this.endpoint,
      this.username
    )
  }

  getGithubUser = async (): Promise<GithubUser> =>
    this.GetGithubUserService.execute()

  listGithubTopTechnology = async (): Promise<[string, number][]> => {
    const listTopLanguage = await this.ListGithubTopLanguageService.execute()
    const listTopFramework = await this.ListGithubTopFrameworkService.execute()

    const listTopTechnologyConcat = listTopLanguage.concat(listTopFramework)
    const listTopTechnology = listTopTechnologyConcat.filter(
      (topTechnology) => topTechnology[1] !== 0
    )

    return listTopTechnology
  }
}
