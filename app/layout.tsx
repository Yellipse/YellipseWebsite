import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SpotlightBackground from '@/components/SpotlightBackground'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Yellipse | Coming Soon',
  description: 'Coming Soon Page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SpotlightBackground />
        {children}
      </body>
    </html>
  )
}
