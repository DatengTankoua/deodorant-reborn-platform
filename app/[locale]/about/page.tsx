import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import { Link } from '@/i18n/navigation'
import Navbar from '@/features/navigation/components/navbar'
import { Footer } from '@/features/layout/components/footer'
import { siteConfig } from '@/config/site'

interface Props {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'About' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  }
}

/**
 * About page — project origin, author bio, tech stack, academic references, contribute CTA.
 */
export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('About')

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-950 text-gray-100">
        {/* Hero */}
        <section className="border-b border-gray-800 py-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <Link
              href="/"
              className="mb-6 inline-block text-sm text-gray-500 transition-colors hover:text-gray-300"
            >
              ← Home
            </Link>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {t('title')}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              {t('subtitle')}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-6 py-16 space-y-20">
          {/* Origin */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold text-white">
              {t('originTitle')}
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>{t('originP1')}</p>
              <p>{t('originP2')}</p>
            </div>
          </section>

          {/* What it does */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold text-white">
              {t('whatTitle')}
            </h2>
            <p className="mb-4 text-gray-300">{t('whatIntro')}</p>
            <ul className="space-y-3">
              {(['whatItem1', 'whatItem2', 'whatItem3', 'whatItem4', 'whatItem5'] as const).map(
                (key) => (
                  <li key={key} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                    <span className="text-gray-300">{t(key)}</span>
                  </li>
                ),
              )}
            </ul>
          </section>

          {/* Author */}
          <section className="rounded-2xl border border-gray-800 bg-gray-900/60 p-8">
            <h2 className="mb-6 text-2xl font-semibold text-white">
              {t('authorTitle')}
            </h2>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              {/* Avatar placeholder */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-violet-600 text-2xl font-bold text-white">
                DT
              </div>
              <div>
                <p className="text-xl font-semibold text-white">{t('authorName')}</p>
                <p className="mb-4 text-sm text-gray-500">{t('authorRole')}</p>
                <p className="mb-4 text-gray-300 leading-relaxed">{t('authorBio')}</p>
                <p className="text-sm text-gray-500">
                  {t('authorContact')}{' '}
                  <a
                    href="mailto:datengtankoua@gmail.com"
                    className="text-blue-400 hover:underline"
                  >
                    datengtankoua@gmail.com
                  </a>
                  {' · '}
                  <a
                    href={siteConfig.author.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    GitHub
                  </a>
                  {' · '}
                  <a
                    href={siteConfig.author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    LinkedIn
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Tech Stack */}
          <section>
            <h2 className="mb-8 text-2xl font-semibold text-white">
              {t('techTitle')}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Plugin */}
              <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                  {t('techPluginTitle')}
                </h3>
                <ul className="space-y-2">
                  {(['techPlugin1', 'techPlugin2', 'techPlugin3', 'techPlugin4'] as const).map(
                    (key) => (
                      <li key={key} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="text-violet-400" aria-hidden="true">▸</span>
                        {t(key)}
                      </li>
                    ),
                  )}
                </ul>
              </div>
              {/* Platform */}
              <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                  {t('techPlatformTitle')}
                </h3>
                <ul className="space-y-2">
                  {([
                    'techPlatform1',
                    'techPlatform2',
                    'techPlatform3',
                    'techPlatform4',
                    'techPlatform5',
                  ] as const).map((key) => (
                    <li key={key} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-blue-400" aria-hidden="true">▸</span>
                      {t(key)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Contribute CTA */}
          <section className="rounded-2xl border border-blue-900/50 bg-blue-950/30 p-8">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              {t('contributeTitle')}
            </h2>
            <p className="mb-3 text-gray-300 leading-relaxed">{t('contributeP1')}</p>
            <p className="mb-6 text-gray-300 leading-relaxed">{t('contributeP2')}</p>
            <a
              href={siteConfig.plugin.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
            >
              {t('contributeButton')}
            </a>
          </section>

          {/* Academic references */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold text-white">
              {t('researchTitle')}
            </h2>
            <p className="mb-4 text-gray-300">{t('researchP1')}</p>
            <ol className="space-y-3 list-decimal list-inside">
              {(['researchItem1', 'researchItem2', 'researchItem3'] as const).map((key) => (
                <li key={key} className="text-sm text-gray-400">
                  {t(key)}
                </li>
              ))}
            </ol>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
