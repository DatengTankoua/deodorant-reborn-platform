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
  const t = await getTranslations({ locale, namespace: 'Legal.cookies' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  }
}

/**
 * Cookie Policy page — 6 sections with cookie tables.
 */
export default async function CookiesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'Legal.cookies' })

  const sections = [
    { id: 's1', title: t('s1Title') },
    { id: 's2', title: t('s2Title') },
    { id: 's3', title: t('s3Title') },
    { id: 's4', title: t('s4Title') },
    { id: 's5', title: t('s5Title') },
    { id: 's6', title: t('s6Title') },
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

            {/* Essential Cookies */}
            <h3>{t('s2EssentialTitle')}</h3>
            <p>{t('s2EssentialDesc')}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="pb-2 pr-4 text-left font-semibold text-gray-300">
                      {t('tableHeader1')}
                    </th>
                    <th className="pb-2 pr-4 text-left font-semibold text-gray-300">
                      {t('tableHeader2')}
                    </th>
                    <th className="pb-2 pr-4 text-left font-semibold text-gray-300">
                      {t('tableHeader3')}
                    </th>
                    <th className="pb-2 text-left font-semibold text-gray-300">
                      {t('tableHeader4')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 pr-4 font-mono text-xs text-gray-400">
                      {t('s2E1Name')}
                    </td>
                    <td className="py-2 pr-4 text-gray-300">{t('s2E1Purpose')}</td>
                    <td className="py-2 pr-4 text-gray-400">{t('s2E1Duration')}</td>
                    <td className="py-2 text-gray-400">{t('s2E1Provider')}</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 pr-4 font-mono text-xs text-gray-400">
                      {t('s2E2Name')}
                    </td>
                    <td className="py-2 pr-4 text-gray-300">{t('s2E2Purpose')}</td>
                    <td className="py-2 pr-4 text-gray-400">{t('s2E2Duration')}</td>
                    <td className="py-2 text-gray-400">{t('s2E2Provider')}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Analytics */}
            <h3>{t('s2AnalyticsTitle')}</h3>
            <p>{t('s2AnalyticsDesc')}</p>
            <p className="rounded-md bg-green-950/40 px-4 py-2 text-sm text-green-400">
              {t('s2AnalyticsNote')}
            </p>

            {/* Preference Storage */}
            <h3>{t('s2PreferenceTitle')}</h3>
            <p>{t('s2PreferenceDesc')}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="pb-2 pr-4 text-left font-semibold text-gray-300">
                      {t('tableHeader1')}
                    </th>
                    <th className="pb-2 pr-4 text-left font-semibold text-gray-300">
                      {t('tableHeader2')}
                    </th>
                    <th className="pb-2 text-left font-semibold text-gray-300">
                      {t('tableHeader3')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 pr-4 font-mono text-xs text-gray-400">
                      {t('s2P1Name')}
                    </td>
                    <td className="py-2 pr-4 text-gray-300">{t('s2P1Purpose')}</td>
                    <td className="py-2 text-gray-400">{t('s2P1Duration')}</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 pr-4 font-mono text-xs text-gray-400">
                      {t('s2P2Name')}
                    </td>
                    <td className="py-2 pr-4 text-gray-300">{t('s2P2Purpose')}</td>
                    <td className="py-2 text-gray-400">{t('s2P2Duration')}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Advertising */}
            <h3>{t('s2AdvertisingTitle')}</h3>
            <p>{t('s2AdvertisingDesc')}</p>
          </section>

          <section id="s3">
            <h2>{t('s3Title')}</h2>
            <p>{t('s3p1')}</p>
            <p>{t('s3p2')}</p>
          </section>

          <section id="s4">
            <h2>{t('s4Title')}</h2>
            <p>{t('s4p1')}</p>
            <ul>
              <li>{t('s4Item1')}</li>
              <li>{t('s4Item2')}</li>
              <li>{t('s4Item3')}</li>
              <li>{t('s4Item4')}</li>
            </ul>
            <p>{t('s4p2')}</p>
          </section>

          <section id="s5">
            <h2>{t('s5Title')}</h2>
            <p>{t('s5p1')}</p>
          </section>

          <section id="s6">
            <h2>{t('s6Title')}</h2>
            <p>
              <a href="mailto:datengtankoua@gmail.com">{t('s6p1')}</a>
            </p>
          </section>
        </LegalPageLayout>
      </main>
      <Footer />
    </>
  )
}
