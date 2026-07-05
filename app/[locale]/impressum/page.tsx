import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import { Navbar } from '@/features/navigation/components/navbar'
import { Footer } from '@/features/layout/components/footer'
import LegalPageLayout from '@/components/shared/legal-page-layout'

interface Props {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Legal.impressum' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  }
}

/**
 * Impressum page — legally required in Germany (§ 5 TMG).
 * Short page, no table of contents.
 */
export default async function ImpressumPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'Legal.impressum' })

  return (
    <>
      <Navbar />
      <main>
        <LegalPageLayout title={t('title')} lastUpdated="">
          <p className="text-sm text-gray-500 italic">{t('legalNote')}</p>

          <section id="s1">
            <h2>{t('s1Title')}</h2>
            <p>
              <strong>{t('s1Name')}</strong>
            </p>
            <p>
              <span className="text-gray-400">{t('s1AddressLabel')}</span>{' '}
              {t('s1Address')}
            </p>
            <p>
              <span className="text-gray-400">{t('s1EmailLabel')}</span>{' '}
              <a href="mailto:datengtankoua@gmail.com">{t('s1Email')}</a>
            </p>
            <p className="text-sm text-gray-500">{t('s1Note')}</p>
          </section>

          <section id="s2">
            <h2>{t('s2Title')}</h2>
            <p>{t('s2Content')}</p>
          </section>

          <section id="s3">
            <h2>{t('s3Title')}</h2>
            <p>{t('s3p1')}</p>
            <p>{t('s3p2')}</p>
          </section>

          <section id="s4">
            <h2>{t('s4Title')}</h2>
            <p>{t('s4p1')}</p>
          </section>

          <section id="s5">
            <h2>{t('s5Title')}</h2>
            <p>{t('s5p1')}</p>
          </section>

          <section id="s6">
            <h2>{t('s6Title')}</h2>
            <p>
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('s6p1')}
              </a>
            </p>
            <p>{t('s6p2')}</p>
          </section>
        </LegalPageLayout>
      </main>
      <Footer />
    </>
  )
}
