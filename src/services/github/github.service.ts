import { GithubUser } from '@/interfaces/github/github-user.interface'
import { GetGithubUserService } from './get-github-user.service'
import { ListGithubTopLanguageService } from './list-github-top-language.service'

export class GithubService {
  private endpoint: string
  private username: string

  private GetGithubUserService: GetGithubUserService
  private ListGithubTopLanguageService: ListGithubTopLanguageService

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
  }

  getGithubUser = async (): Promise<GithubUser> =>
    this.GetGithubUserService.execute()

  listGithubTopLanguage = async (): Promise<[string, number][]> =>
    this.ListGithubTopLanguageService.execute()
}
