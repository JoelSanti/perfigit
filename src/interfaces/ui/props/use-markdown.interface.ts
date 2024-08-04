export interface UseMarkdownProps {
  markdown: string
  setMarkdown: (markdown: string) => void
  isMarkdownLoading: boolean
  generateMarkdownCode: (githubUsername: string) => void
  isShowMarkdownCode: boolean
  toggleMarkdownPreview: () => void
}
