import type { Metadata } from 'next'
import './globals.css'
import { generalFont } from '@/config/fonts'
import { MarkdownProvider } from '@/context/Markdown.context'
import { ToastProvider } from '@/context/Toast.context'

export const metadata: Metadata = {
  title: 'PerfiGit',
  description:
    'Web application focused on generating GitHub README profiles using AI.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es'>
      <body className={generalFont.className}>
        <ToastProvider>
          <MarkdownProvider>{children}</MarkdownProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
