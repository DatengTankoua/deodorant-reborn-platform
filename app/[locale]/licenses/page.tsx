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
  const t = await getTranslations({ locale, namespace: 'Legal.licenses' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  }
}

/** MIT License text for intellij-deodorant-reborn */
const MIT_REBORN = `MIT License

Copyright (c) 2024–2026 Dateng Tankoua Emery Josian

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`

/** MIT License text for original IntelliJDeodorant */
const MIT_ORIGINAL = `MIT License

Copyright (c) 2018 JetBrains Research

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`

/**
 * Open Source Licenses page — 4 sections with MIT license texts.
 */
export default async function LicensesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('Legal.licenses')

  const sections = [
    { id: 's1', title: t('s1Title') },
    { id: 's2', title: t('s2Title') },
    { id: 's3', title: t('s3Title') },
    { id: 's4', title: t('s4Title') },
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
            <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs leading-relaxed text-gray-300">
              <code>{MIT_REBORN}</code>
            </pre>
          </section>

          <section id="s2">
            <h2>{t('s2Title')}</h2>
            <p>{t('s2p1')}</p>
            <p>
              <a
                href="https://github.com/JetBrains-Research/IntelliJDeodorant"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('s2Repo')}
              </a>
            </p>
            <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs leading-relaxed text-gray-300">
              <code>{MIT_ORIGINAL}</code>
            </pre>
          </section>

          <section id="s3">
            <h2>{t('s3Title')}</h2>
            <p>{t('s3p1')}</p>
            <ul>
              <li>{t('s3Item1')}</li>
              <li>{t('s3Item2')}</li>
              <li>{t('s3Item3')}</li>
              <li>{t('s3Item4')}</li>
              <li>{t('s3Item5')}</li>
              <li>{t('s3Item6')}</li>
              <li>{t('s3Item7')}</li>
              <li>{t('s3Item8')}</li>
            </ul>
          </section>

          <section id="s4">
            <h2>{t('s4Title')}</h2>
            <p>{t('s4p1')}</p>
            <p>
              {t('s4p2')}{' '}
              <a
                href="https://github.com/DatengTankoua/deodorant-reborn-platform"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/DatengTankoua/deodorant-reborn-platform
              </a>
            </p>
          </section>
        </LegalPageLayout>
      </main>
      <Footer />
    </>
  )
}
