import ReactMarkdown from 'react-markdown'
import 'github-markdown-css'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { useMarkdown } from '@/hooks/useMarkdown.hooks'

export const MarkDownPreview: React.FC = () => {
  const { markdown } = useMarkdown()

  return (
    <div className='markdown-body relative h-full overflow-y-auto p-10 lg:w-1/2'>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
