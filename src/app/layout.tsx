import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Nav } from '@/components/Nav'
import { BackgroundSword } from '@/components/BackgroundSword'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Token Ninja: Stop Wasting AI Tokens',
  description:
    'The intelligence layer for your agent pipeline. Classify, route, trim, and reallocate tokens before the bill arrives. Built for teams that run AI at scale.',
  openGraph: {
    title: 'Token Ninja: Stop Wasting AI Tokens',
    description:
      'The intelligence layer for your agent pipeline. Cut token waste by ~30% without sacrificing output quality.',
    siteName: 'Token Ninja',
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Faded ASCII sword watermark — z-index 0, behind everything */}
        <BackgroundSword />
        {/* Nav sits at z-50 via its own fixed positioning */}
        <Nav />
        {/* Main content above the sword watermark */}
        <main className="flex-1 pt-14 relative z-10">{children}</main>
      </body>
    </html>
  )
}
