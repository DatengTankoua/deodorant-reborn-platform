import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import Navbar from '@/features/navigation/components/navbar'
import Footer from '@/features/layout/components/footer'
import LegalPageLayout from '@/components/shared/legal-page-layout'

interface Props {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Legal.terms' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  }
}

/**
 * Terms of Service page — 11 sections, MIT license context.
 */
export default async function TermsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('Legal.terms')
  const tLegal = await getTranslations('Legal')

  const sections = [
    { id: 's1', title: t('s1Title') },
    { id: 's2', title: t('s2Title') },
    { id: 's3', title: t('s3Title') },
    { id: 's4', title: t('s4Title') },
    { id: 's5', title: t('s5Title') },
    { id: 's6', title: t('s6Title') },
    { id: 's7', title: t('s7Title') },
    { id: 's8', title: t('s8Title') },
    { id: 's9', title: t('s9Title') },
    { id: 's10', title: t('s10Title') },
    { id: 's11', title: t('s11Title') },
  ]

  return (
    <>
      <Navbar />
      <main>
        <LegalPageLayout
          title={t('title')}
          lastUpdated={t('lastUpdated')}
          sections={sections}
        >
          <p className="lead">{t('intro')}</p>

          <section id="s1">
            <h2>{t('s1Title')}</h2>
            <p>{t('s1p1')}</p>
            <p>{t('s1p2')}</p>
          </section>

          <section id="s2">
            <h2>{t('s2Title')}</h2>
            <p>{t('s2p1')}</p>
          </section>

          <section id="s3">
            <h2>{t('s3Title')}</h2>
            <p>{t('s3p1')}</p>
            <p>
              {t('s3p2')}{' '}
              <a href="/licenses">{tLegal('nav.licenses')}</a>.
            </p>
          </section>

          <section id="s4">
            <h2>{t('s4Title')}</h2>
            <p>{t('s4Intro')}</p>
            <ul>
              <li>{t('s4Item1')}</li>
              <li>{t('s4Item2')}</li>
              <li>{t('s4Item3')}</li>
              <li>{t('s4Item4')}</li>
            </ul>
          </section>

          <section id="s5">
            <h2>{t('s5Title')}</h2>
            <p>{t('s5Intro')}</p>
            <ul>
              <li>{t('s5Item1')}</li>
              <li>{t('s5Item2')}</li>
              <li>{t('s5Item3')}</li>
              <li>{t('s5Item4')}</li>
              <li>{t('s5Item5')}</li>
            </ul>
          </section>

          <section id="s6">
            <h2>{t('s6Title')}</h2>
            <p className="uppercase text-xs text-gray-400">{t('s6p1')}</p>
            <p>{t('s6p2')}</p>
            <ul>
              <li>{t('s6Item1')}</li>
              <li>{t('s6Item2')}</li>
              <li>{t('s6Item3')}</li>
              <li>{t('s6Item4')}</li>
            </ul>
            <p>{t('s6p3')}</p>
          </section>

          <section id="s7">
            <h2>{t('s7Title')}</h2>
            <p>{t('s7p1')}</p>
            <p>{t('s7p2')}</p>
          </section>

          <section id="s8">
            <h2>{t('s8Title')}</h2>
            <p>{t('s8p1')}</p>
            <p>{t('s8p2')}</p>
            <p>{t('s8p3')}</p>
          </section>

          <section id="s9">
            <h2>{t('s9Title')}</h2>
            <p>{t('s9p1')}</p>
            <p>{t('s9p2')}</p>
          </section>

          <section id="s10">
            <h2>{t('s10Title')}</h2>
            <p>{t('s10p1')}</p>
          </section>

          <section id="s11">
            <h2>{t('s11Title')}</h2>
            <p>
              <a href="mailto:datengtankoua@gmail.com">
                {t('s11p1')}
              </a>
            </p>
          </section>
        </LegalPageLayout>
      </main>
      <Footer />
    </>
  )
}
