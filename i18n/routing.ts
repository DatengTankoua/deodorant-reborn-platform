import { defineRouting } from 'next-intl/routing'

/** Supported locales and default locale for the application (SRS NFR-I18N-1) */
export const routing = defineRouting({
  locales: ['en', 'de', 'fr'],
  defaultLocale: 'en',
})

export type Locale = (typeof routing.locales)[number]
