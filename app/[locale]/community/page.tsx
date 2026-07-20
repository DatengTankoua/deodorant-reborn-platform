import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { Navbar } from '@/features/navigation/components/navbar'
import { Footer } from '@/features/layout/components/footer'
import { Separator } from '@/components/ui/separator'
import { routing } from '@/i18n/routing'
import { FeedbackForm } from '@/features/community/components/FeedbackForm'
import { FeedbackList } from '@/features/community/components/FeedbackList'
import { FeatureRequestForm } from '@/features/community/components/FeatureRequestForm'
import { FeatureRequestList } from '@/features/community/components/FeatureRequestList'
import { ContributionGuide } from '@/features/community/components/ContributionGuide'
import { ResearchTopics } from '@/features/community/components/ResearchTopics'

interface Props {
  params: Promise<{ locale: string }>
}

/** Pre-render the community page for every supported locale. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

/**
 * SEO metadata for the community page.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Community' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  }
}

interface SectionHeadingProps {
  id: string
  title: string
  description: string
}

/**
 * Reusable section heading with a subtle divider, used to structure the page.
 */
function SectionHeading({ id, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-col gap-3">
      <h2 id={id} className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      <p className="max-w-2xl text-muted-foreground">{description}</p>
      <Separator className="mt-2" />
    </div>
  )
}

/**
 * Community page — brings together user feedback, feature requests, the
 * contribution guide, and open research topics.
 *
 * Server component: composes client sub-components (forms and lists) that manage
 * their own state, so submissions never trigger a full page reload. All copy is
 * localized via next-intl.
 */
export default async function CommunityPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('Community')

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        {/* Hero */}
        <section
          aria-labelledby="community-heading"
          className="border-b border-border py-20"
        >
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h1
              id="community-heading"
              className="mb-4 text-4xl font-semibold tracking-tight sm:text-5xl"
            >
              {t('heroTitle')}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t('heroSubtitle')}
            </p>
          </div>
        </section>

        <div className="mx-auto flex max-w-6xl flex-col gap-24 px-6 py-20">
          {/* Feedback */}
          <section aria-labelledby="feedback-heading">
            <SectionHeading
              id="feedback-heading"
              title={t('feedbackSectionTitle')}
              description={t('feedbackSectionDesc')}
            />
            <div className="grid gap-8 lg:grid-cols-2">
              <FeedbackList />
              <FeedbackForm />
            </div>
          </section>

          {/* Feature requests */}
          <section aria-labelledby="feature-requests-heading">
            <SectionHeading
              id="feature-requests-heading"
              title={t('featureSectionTitle')}
              description={t('featureSectionDesc')}
            />
            <div className="grid gap-8 lg:grid-cols-2">
              <FeatureRequestList />
              <FeatureRequestForm />
            </div>
          </section>

          {/* Contribution guide */}
          <section aria-labelledby="contribute-heading">
            <SectionHeading
              id="contribute-heading"
              title={t('contributeSectionTitle')}
              description={t('contributeSectionDesc')}
            />
            <ContributionGuide />
          </section>

          {/* Research topics */}
          <section aria-labelledby="research-heading">
            <SectionHeading
              id="research-heading"
              title={t('researchSectionTitle')}
              description={t('researchSectionDesc')}
            />
            <ResearchTopics />
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
