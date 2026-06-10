import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

/**
 * Server-side i18n configuration.
 * Merges the base message file with the legal namespace file for each locale.
 * Falls back to the default locale when the requested locale is not supported.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

  const [base, legal] = await Promise.all([
    import(`../messages/${locale}.json`),
    import(`../messages/${locale}/legal.json`).catch(() => ({ default: {} })),
  ])

  return {
    locale,
    messages: { ...base.default, ...legal.default },
  }
})

