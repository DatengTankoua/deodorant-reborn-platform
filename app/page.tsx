import { redirect } from 'next/navigation'
import { routing } from '@/i18n/routing'

/**
 * Root page — the middleware redirects all traffic to /[locale],
 * so this page acts as a safety fallback only.
 */
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`)
}

