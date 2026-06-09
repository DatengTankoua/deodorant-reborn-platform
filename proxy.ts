import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

/**
 * next-intl middleware — handles locale detection, redirects, and cookie persistence.
 * - Redirects / → /en (default locale)
 * - Reads Accept-Language header for auto-detection
 * - Persists locale choice in NEXT_LOCALE cookie
 */
export default createMiddleware(routing)

export const config = {
  // Match all paths except api routes, Next.js internals, and static files
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
