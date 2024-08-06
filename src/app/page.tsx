'use client'

import { MarkdownCode, GithubForm, MarkDownPreview } from '@/components'
import CustomLayout from '@/components/layout/CustomLayout'
import { useMarkdown } from '@/hooks/useMarkdown.hooks'

export default function Home() {
  const { isShowMarkdownCode, isMarkdownLoading } = useMarkdown()

  return (
    <main>
      <CustomLayout>
        <section>
          <div className='p card h-[780px] overflow-hidden bg-neutral shadow-xl lg:card-side'>
            {isShowMarkdownCode ? <MarkdownCode /> : <GithubForm />}
            {isMarkdownLoading ? (
              <div className='skeleton h-full rounded-none lg:w-1/2'></div>
            ) : (
              <MarkDownPreview />
            )}
          </div>
        </section>
      </CustomLayout>
    </main>
  )
}
