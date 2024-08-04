import type { Metadata } from 'next'
import './globals.css'
import { generalFont } from '@/config/fonts'
import CustomLayout from '@/components/layout/CustomLayout'

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
        <CustomLayout>{children}</CustomLayout>
      </body>
    </html>
  )
}
