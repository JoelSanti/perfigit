import React from 'react'
import ReactMarkdown from 'react-markdown'
import 'github-markdown-css'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { MarkdownPreviewProps } from '@/interfaces/ui/markdown-preview-props.interface'

export const MarkDownPreview: React.FC<MarkdownPreviewProps> = ({
  markdown,
}) => {
  return (
    <div className='markdown-body l relative h-full overflow-y-auto p-10 lg:w-1/2'>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
