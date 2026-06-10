'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'

const CONSENT_KEY = 'cookie-consent'

/**
 * GDPR-compliant cookie consent banner.
 * Shows once per browser session until the user accepts or clears local storage.
 * Uses cookieless Vercel Analytics so the only purpose is to inform, not gate.
 */
export default function CookieBanner() {
  const t = useTranslations('Legal.cookieBanner')
  const router = useRouter()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const consent = localStorage.getItem(CONSENT_KEY)
      if (!consent) {
        setVisible(true)
      }
    } catch {
      // localStorage not available (e.g. SSR or restricted browser)
    }
  }, [])

  /** Accept cookies and hide the banner. */
  function handleAccept() {
    try {
      localStorage.setItem(CONSENT_KEY, 'accepted')
    } catch {
      // ignore
    }
    setVisible(false)
  }

  /** Navigate to the Cookie Policy page. */
  function handleManage() {
    router.push('/cookies')
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t('learnMore')}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-800 bg-gray-900/95 px-4 py-4 backdrop-blur-sm sm:px-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-300">
          {t('message')}{' '}
          <button
            onClick={handleManage}
            className="underline transition-colors hover:text-white"
          >
            {t('learnMore')}
          </button>
        </p>

        <div className="flex shrink-0 gap-3">
          <button
            onClick={handleManage}
            className="rounded-md border border-gray-700 px-4 py-2 text-sm text-gray-300 transition-colors hover:border-gray-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {t('manage')}
          </button>
          <button
            onClick={handleAccept}
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  )
}
