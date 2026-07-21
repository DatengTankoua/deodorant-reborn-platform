'use client'

import { useCallback, useEffect, useState } from 'react'
import { AlertCircle, MessageSquare, RefreshCw } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { feedbackService } from '@/lib/api/feedbackService'
import type { Feedback } from '@/types/feedback'
import {
  COMMUNITY_EVENTS,
  formatDate,
  maskEmail,
} from '@/features/community/lib/community'

import { StarRating } from './StarRating'

/** Lifecycle states of the data fetch. */
type Status = 'loading' | 'success' | 'error'

/**
 * Client component that lists all submitted feedback, most recent first.
 * Handles loading (skeletons), empty and error (with retry) states, and
 * re-fetches automatically when {@link FeedbackForm} reports a new submission.
 */
export function FeedbackList() {
  const t = useTranslations('Community.feedbackList')
  const [items, setItems] = useState<Feedback[]>([])
  const [status, setStatus] = useState<Status>('loading')
  const [error, setError] = useState<string | null>(null)

  /** Fetches feedback from the API and updates local state. */
  const load = useCallback(async () => {
    setStatus('loading')
    setError(null)

    const { data, error: apiError } = await feedbackService.getAll()

    if (apiError || !data) {
      setStatus('error')
      setError(apiError?? t('loadError'))
      return
    }

    const sorted = [...data].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    setItems(sorted)
    setStatus('success')
  }, [t])

  useEffect(() => {
    void load()

    const handleSubmitted = () => void load()
    window.addEventListener(COMMUNITY_EVENTS.feedbackSubmitted, handleSubmitted)
    return () =>
      window.removeEventListener(
        COMMUNITY_EVENTS.feedbackSubmitted,
        handleSubmitted,
      )
  }, [load])

  if (status === 'loading') {
    return (
      <div className="flex flex-col gap-4" aria-busy="true" aria-live="polite">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6"
          >
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div
        role="alert"
        className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-10 text-center"
      >
        <AlertCircle className="size-8 text-destructive" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">{error}</p>
        <Button variant="outline" onClick={() => void load()}>
          <RefreshCw className="size-4" aria-hidden="true" />
          {t('retry')}
        </Button>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-card/50 p-10 text-center">
        <MessageSquare
          className="size-8 text-muted-foreground"
          aria-hidden="true"
        />
        <p className="font-medium">{t('emptyTitle')}</p>
        <p className="text-sm text-muted-foreground">{t('emptyDesc')}</p>
      </div>
    )
  }

  return (
    <ul role="list" className="flex flex-col gap-4">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6"
        >
          <div className="flex items-center justify-between gap-3">
            <StarRating value={item.rating} label="Rating" size="sm" />
            <time
              dateTime={item.createdAt}
              className="text-xs text-muted-foreground"
            >
              {formatDate(item.createdAt)}
            </time>
          </div>
          <p className="text-sm leading-relaxed text-foreground">
            {item.message}
          </p>
          <p className="text-xs text-muted-foreground">
            {maskEmail(item.email) ?? t('anonymous')}
          </p>
        </li>
      ))}
    </ul>
  )
}
