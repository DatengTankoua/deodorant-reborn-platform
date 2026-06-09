'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

/** Human-readable label for each supported locale */
const LOCALE_LABELS: Record<string, string> = {
  en: 'EN',
  de: 'DE',
  fr: 'FR',
}

/**
 * Client Component — locale switcher select element.
 * Uses next-intl's locale-aware router so the locale prefix is preserved.
 * Persists the selection via the NEXT_LOCALE cookie managed by the middleware.
 *
 * US-032: As a non-English speaker, I want to switch the interface language.
 */
export function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('Nav')

  /**
   * Navigates to the same pathname in the selected locale.
   */
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    router.replace(pathname, { locale: event.target.value })
  }

  return (
    <select
      value={locale}
      onChange={handleChange}
      aria-label={t('selectLanguage')}
      className="cursor-pointer rounded border border-border bg-background px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {routing.locales.map((loc) => (
        <option key={loc} value={loc}>
          {LOCALE_LABELS[loc]}
        </option>
      ))}
    </select>
  )
}
