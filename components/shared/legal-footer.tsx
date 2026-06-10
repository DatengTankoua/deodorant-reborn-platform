import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'

/**
 * Legal footer with links to all legal pages and a contact email.
 * Rendered as a Server Component inside the main footer.
 */
export default async function LegalFooter() {
  const t = await getTranslations('Legal')
  const year = new Date().getFullYear()

  const links = [
    { href: '/privacy', label: t('nav.privacy') },
    { href: '/terms', label: t('nav.terms') },
    { href: '/cookies', label: t('nav.cookies') },
    { href: '/licenses', label: t('nav.licenses') },
    { href: '/impressum', label: t('nav.impressum') },
  ] as const

  return (
    <div className="mt-8 border-t border-gray-800 pt-6">
      <nav
        aria-label="Legal navigation"
        className="mb-4 flex flex-wrap justify-center gap-x-4 gap-y-2"
      >
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-xs text-gray-500 transition-colors hover:text-gray-300"
          >
            {label}
          </Link>
        ))}
        <a
          href="mailto:datengtankoua@gmail.com"
          className="text-xs text-gray-500 transition-colors hover:text-gray-300"
        >
          {t('nav.contact')}
        </a>
      </nav>

      <p className="text-center text-xs text-gray-600">
        {t('footer.builtWith')} · © {year} Dateng Tankoua Emery Josian ·{' '}
        {t('footer.rights')}
      </p>
    </div>
  )
}
