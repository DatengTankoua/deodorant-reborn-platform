import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { routing } from '@/i18n/routing'
import '../globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

/**
 * Generates locale-specific Open Graph metadata for each supported language.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: {
      default: t('title'),
      template: t('titleTemplate'),
    },
    description: t('description'),
    keywords: ['IntelliJ plugin', 'code clone detection', 'refactoring', 'Java', 'Kotlin'],
    openGraph: {
      type: 'website',
      locale,
      title: t('title'),
      description: t('description'),
      siteName: 'intellij-deodorant-reborn',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    icons: {
      icon: [
        { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
        { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-icon.png',
    },
    robots: { index: true, follow: true },
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `/${loc}`]),
      ),
    },
  }
}

/**
 * Pre-generate static pages for each supported locale (enables ISR per locale).
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

/**
 * Locale-aware root layout. Provides fonts, dark-mode class, and NextIntlClientProvider.
 */
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  // Validate locale — 404 if someone navigates to /xx where xx is unsupported
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enable static rendering for this locale
  setRequestLocale(locale)

  return (
    <html
      lang={locale}
      className={`dark ${geistSans.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
