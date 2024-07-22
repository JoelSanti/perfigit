export interface GithubUser {
  id: number
  login: string
  avatar_url: string
  location: string
  email: string
  [key: string]: string | number
}
