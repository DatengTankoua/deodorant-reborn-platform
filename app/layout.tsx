import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'intellij-deodorant-reborn — Code Clone Detection Plugin',
    template: '%s | intellij-deodorant-reborn',
  },
  description:
    'Open-source IntelliJ IDEA plugin for detecting and refactoring Type-1 and Type-2 code clones in Java/Kotlin projects. Research-driven, automated refactoring suggestions.',
  keywords: ['IntelliJ plugin', 'code clone detection', 'refactoring', 'Java', 'Kotlin', 'static analysis'],
  authors: [{ name: 'intellij-deodorant-reborn contributors' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'intellij-deodorant-reborn — Code Clone Detection Plugin',
    description:
      'Detect and refactor Type-1 and Type-2 code clones in Java/Kotlin projects directly inside IntelliJ IDEA.',
    siteName: 'intellij-deodorant-reborn',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'intellij-deodorant-reborn — Code Clone Detection Plugin',
    description:
      'Detect and refactor Type-1 and Type-2 code clones in Java/Kotlin projects directly inside IntelliJ IDEA.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
