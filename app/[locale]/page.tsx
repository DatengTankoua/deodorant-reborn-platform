import { Suspense } from 'react'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { Navbar } from '@/features/navigation/components/navbar'
import { Footer } from '@/features/layout/components/footer'
import { Hero } from '@/features/home/components/hero'
import { StatsBar } from '@/features/home/components/stats-bar'
import { FeaturesSection } from '@/features/home/components/features-section'
import { Testimonials } from '@/features/home/components/testimonials'
import { routing } from '@/i18n/routing'

type Props = {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

/** Skeleton shown while GitHub stats are being fetched server-side */
function StatsSkeleton({ ariaLabel }: { ariaLabel: string }) {
  return (
    <div
      aria-busy="true"
      aria-label={ariaLabel}
      className="border-y border-border bg-muted/30 py-4"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-10 px-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="size-4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-8 animate-pulse rounded bg-muted" />
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Home page — server-rendered for each locale.
 * US-001: hero · US-002: stats · US-003: features
 */
export default async function LocalePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('StatsBar')

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Suspense fallback={<StatsSkeleton ariaLabel={t('loading')} />}>
          <StatsBar />
        </Suspense>
        <Testimonials />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
