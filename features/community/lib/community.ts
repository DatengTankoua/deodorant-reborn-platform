/**
 * Custom DOM events used to keep the community lists in sync with their forms
 * without a full page reload. A form dispatches the event on the `window` after
 * a successful submission and the matching list re-fetches its data.
 */
export const COMMUNITY_EVENTS = {
  feedbackSubmitted: 'community:feedback-submitted',
  featureRequestSubmitted: 'community:feature-request-submitted',
} as const

/**
 * Masks the local part of an email for public display, e.g.
 * `test@example.com` → `te**@example.com`. Returns `null` when no maskable
 * email is available, so callers can substitute a localized fallback.
 *
 * @param email - Raw email address or `null`.
 * @returns A privacy-preserving representation, or `null` when unavailable.
 */
export function maskEmail(email: string | null): string | null {
  if (!email) return null

  const atIndex = email.indexOf('@')
  if (atIndex <= 0) return null

  const local = email.slice(0, atIndex)
  const domain = email.slice(atIndex)
  const visible = local.slice(0, 2)

  return `${visible}${'*'.repeat(Math.max(local.length - 2, 2))}${domain}`
}

/**
 * Formats an ISO timestamp into a human-readable date. Falls back to the raw
 * value if it cannot be parsed.
 *
 * @param iso - ISO 8601 date string.
 * @returns A localized, medium-length date string.
 */
export function formatDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}
