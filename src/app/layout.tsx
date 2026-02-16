import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/components/providers/auth-provider'

export const metadata: Metadata = {
  title: 'Listy - Smart Bookmark Manager',
  description: 'Organize your bookmarks with collections, tags, and powerful search',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="font-sans" suppressHydrationWarning>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
