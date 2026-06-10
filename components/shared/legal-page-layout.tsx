import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'

interface TocSection {
  id: string
  title: string
}

interface LegalPageLayoutProps {
  title: string
  lastUpdated: string
  sections?: TocSection[]
  children: React.ReactNode
}

/**
 * Shared layout for all legal pages.
 * Renders a back-to-home link, page title, last-updated date,
 * an optional table of contents, and the page content.
 */
export default async function LegalPageLayout({
  title,
  lastUpdated,
  sections,
  children,
}: LegalPageLayoutProps) {
  const t = await getTranslations('Legal')

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-gray-400 transition-colors hover:text-gray-200"
        >
          {t('backToHome')}
        </Link>

        {/* Title */}
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>

        {/* Last updated */}
        <p className="mb-8 text-sm text-gray-500">
          {t('lastUpdatedLabel')}{' '}
          <time dateTime={lastUpdated}>{lastUpdated}</time>
        </p>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/* Table of Contents */}
          {sections && sections.length > 0 && (
            <nav
              aria-label={t('toc')}
              className="shrink-0 lg:sticky lg:top-8 lg:w-56 lg:self-start"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                {t('toc')}
              </p>
              <ol className="space-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block rounded px-2 py-1 text-sm text-gray-400 transition-colors hover:bg-gray-800 hover:text-gray-200"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Page content */}
          <article className="min-w-0 flex-1 prose prose-invert prose-sm max-w-none prose-headings:scroll-mt-20 prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline">
            {children}
          </article>
        </div>
      </div>
    </div>
  )
}
