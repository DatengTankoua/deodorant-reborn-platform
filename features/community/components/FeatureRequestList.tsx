'use client'

import { useCallback, useEffect, useState } from 'react'
import { AlertCircle, ChevronUp, Lightbulb, RefreshCw } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { featureRequestService } from '@/lib/api/featureRequestService'
import type { FeatureRequest } from '@/types/featureRequest'
import {
  COMMUNITY_EVENTS,
  formatDate,
} from '@/features/community/lib/community'

/** Lifecycle states of the data fetch. */
type Status = 'loading' | 'success' | 'error'

/**
 * Client component that lists all feature requests, most upvoted first.
 * Handles loading (skeletons), empty and error (with retry) states, and
 * re-fetches automatically when {@link FeatureRequestForm} reports a new
 * submission. Upvoting is a local-only optimistic UI (no API endpoint yet).
 */
export function FeatureRequestList() {
  const t = useTranslations('Community.featureList')
  const [items, setItems] = useState<FeatureRequest[]>([])
  const [status, setStatus] = useState<Status>('loading')
  const [error, setError] = useState<string | null>(null)
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set())

  /** Fetches feature requests from the API and updates local state. */
  const load = useCallback(async () => {
    setStatus('loading')
    setError(null)

    const { data, error: apiError } = await featureRequestService.getAll()

    if (apiError || !data) {
      setStatus('error')
      setError(t('loadError'))
      return
    }

    const sorted = [...data].sort((a, b) => b.votes - a.votes)
    setItems(sorted)
    setStatus('success')
  }, [t])

  useEffect(() => {
    void load()

    const handleSubmitted = () => void load()
    window.addEventListener(
      COMMUNITY_EVENTS.featureRequestSubmitted,
      handleSubmitted,
    )
    return () =>
      window.removeEventListener(
        COMMUNITY_EVENTS.featureRequestSubmitted,
        handleSubmitted,
      )
  }, [load])

  /**
   * Optimistically toggles a local upvote. Persistence is intentionally
   * deferred until the backend exposes a voting endpoint.
   */
  function toggleVote(id: string) {
    setVotedIds((prev) => {
      const next = new Set(prev)
      const hasVoted = next.has(id)
      if (hasVoted) {
        next.delete(id)
      } else {
        next.add(id)
      }

      setItems((current) =>
        current.map((item) =>
          item.id === id
            ? { ...item, votes: item.votes + (hasVoted ? -1 : 1) }
            : item,
        ),
      )
      return next
    })
  }

  if (status === 'loading') {
    return (
      <div className="flex flex-col gap-4" aria-busy="true" aria-live="polite">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex gap-4 rounded-xl border border-border bg-card p-6"
          >
            <Skeleton className="h-14 w-12 shrink-0" />
            <div className="flex flex-1 flex-col gap-3">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
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
        <Lightbulb className="size-8 text-muted-foreground" aria-hidden="true" />
        <p className="font-medium">{t('emptyTitle')}</p>
        <p className="text-sm text-muted-foreground">{t('emptyDesc')}</p>
      </div>
    )
  }

  return (
    <ul role="list" className="flex flex-col gap-4">
      {items.map((item) => {
        const hasVoted = votedIds.has(item.id)
        return (
          <li
            key={item.id}
            className="flex gap-4 rounded-xl border border-border bg-card p-6"
          >
            <button
              type="button"
              onClick={() => toggleVote(item.id)}
              aria-pressed={hasVoted}
              aria-label={t('upvoteAria', {
                title: item.title,
                votes: item.votes,
              })}
              className={
                'flex h-fit flex-col items-center gap-0.5 rounded-lg border px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 ' +
                (hasVoted
                  ? 'border-primary/40 bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:bg-muted hover:text-foreground')
              }
            >
              <ChevronUp className="size-4" aria-hidden="true" />
              {item.votes}
            </button>

            <div className="flex flex-1 flex-col gap-2">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold">{item.title}</h3>
                <Badge variant="secondary" className="shrink-0">
                  {t('votes', { count: item.votes })}
                </Badge>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <time
                dateTime={item.createdAt}
                className="text-xs text-muted-foreground"
              >
                {formatDate(item.createdAt)}
              </time>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
