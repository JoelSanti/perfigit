export interface GithubFormProps {
  onClick: () => void
  onSubmit: (value: string) => void
  isLoading: boolean
  inputValue: string
  onInputChange: (value: string) => void
}
