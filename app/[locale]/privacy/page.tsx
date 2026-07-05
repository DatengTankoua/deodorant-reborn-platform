import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import { Navbar } from '@/features/navigation/components/navbar'
import { Footer } from '@/features/layout/components/footer'
import LegalPageLayout from '@/components/shared/legal-page-layout'
import Link from 'next/dist/client/link'

interface Props {
  params: Promise<{ locale: string }>
}

/** Generate static params for all supported locales. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

/** Generate locale-aware metadata. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Legal.privacy' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  }
}

/**
 * Privacy Policy page — GDPR-compliant, 11 sections.
 */
export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'Legal.privacy' })
  const tLegal = await getTranslations({ locale, namespace: 'Legal' })

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
            <p>
              <strong>{t('s1p2')}</strong>
            </p>
            <p>{t('s1p3')}</p>
          </section>

          <section id="s2">
            <h2>{t('s2Title')}</h2>
            <p>{t('s2p1')}</p>
            <ul>
              <li>{t('s2Item1')}</li>
              <li>{t('s2Item2')}</li>
              <li>{t('s2Item3')}</li>
              <li>{t('s2Item4')}</li>
              <li>{t('s2Item5')}</li>
            </ul>
          </section>

          <section id="s3">
            <h2>{t('s3Title')}</h2>
            <p>{t('s3p1')}</p>
            <ul>
              <li>{t('s3Item1')}</li>
              <li>{t('s3Item2')}</li>
              <li>{t('s3Item3')}</li>
            </ul>
          </section>

          <section id="s4">
            <h2>{t('s4Title')}</h2>
            <p>{t('s4p1')}</p>
            <ul>
              <li>{t('s4Item1')}</li>
              <li>{t('s4Item2')}</li>
              <li>{t('s4Item3')}</li>
              <li>{t('s4Item4')}</li>
              <li>{t('s4Item5')}</li>
            </ul>
          </section>

          <section id="s5">
            <h2>{t('s5Title')}</h2>
            <p>{t('s5p1')}</p>
            <h3>{t('s5VercelTitle')}</h3>
            <p>{t('s5Vercel')}</p>
            <h3>{t('s5SupabaseTitle')}</h3>
            <p>{t('s5Supabase')}</p>
            <h3>{t('s5RenderTitle')}</h3>
            <p>{t('s5Render')}</p>
            <h3>{t('s5GitHubTitle')}</h3>
            <p>{t('s5GitHub')}</p>
          </section>

          <section id="s6">
            <h2>{t('s6Title')}</h2>
            <p>{t('s6p1')}</p>
            <ul>
              <li>{t('s6Item1')}</li>
              <li>{t('s6Item2')}</li>
              <li>{t('s6Item3')}</li>
              <li>{t('s6Item4')}</li>
              <li>{t('s6Item5')}</li>
              <li>{t('s6Item6')}</li>
            </ul>
            <p>{t('s6p2')}</p>
          </section>

          <section id="s7">
            <h2>{t('s7Title')}</h2>
            <p>{t('s7p1')}</p>
            <p>{t('s7p2')}</p>
          </section>

          <section id="s8">
            <h2>{t('s8Title')}</h2>
            <p>
              {t('s8p1')}{' '}
              <Link href="/cookies">{tLegal('nav.cookies')}</Link>
            </p>
          </section>

          <section id="s9">
            <h2>{t('s9Title')}</h2>
            <p>{t('s9p1')}</p>
          </section>

          <section id="s10">
            <h2>{t('s10Title')}</h2>
            <p>{t('s10p1')}</p>
          </section>

          <section id="s11">
            <h2>{t('s11Title')}</h2>
            <p>{t('s11p1')}</p>
            <p>{t('s11p2')}</p>
            <p>{t('s11p3')}</p>
          </section>
        </LegalPageLayout>
      </main>
      <Footer />
    </>
  )
}
