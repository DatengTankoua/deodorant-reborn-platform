'use client'

import { useTranslations } from 'next-intl'

import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useCallback, useEffect, useState } from 'react'
import { AlertCircle, MessageSquare, RefreshCw, Star } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { feedbackService } from '@/lib/api/feedbackService'
import type { Feedback } from '@/types/feedback'
import {
  COMMUNITY_EVENTS,
  maskEmail,
} from '@/features/community/lib/community'

const MAX_STARS = 5

interface StarsProps {
  rating: number
  label: string
}

/** Lifecycle states of the data fetch. */
type Status = 'loading' | 'success' | 'error'

/** Read-only visual star rating with an accessible label. */
function Stars({ rating, label }: StarsProps) {
  return (
    <div role="img" aria-label={label} className="flex items-center gap-0.5">
      {Array.from({ length: MAX_STARS }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn(
            'size-4',
            i < rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-transparent text-muted-foreground/40',
          )}
        />
      ))}
    </div>
  )
}

/**
 * Testimonials section — social proof for the home page.
 * Renders a responsive grid of positive, highly-rated developer reviews.
 * Server component; all copy is localized via next-intl.
 */
export function Testimonials() {
  const t = useTranslations('Testimonials')
  const tb = useTranslations('Community.feedbackList')
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
      setError(tb('loadError'))
      return
    }

    const sorted = [...data].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    setItems(sorted)
    setStatus('success')
  }, [tb])

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
          {tb('retry')}
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
        <p className="font-medium">{tb('emptyTitle')}</p>
        <p className="text-sm text-muted-foreground">{tb('emptyDesc')}</p>
      </div>
    )
  }

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="mx-auto max-w-6xl px-6 py-20"
    >
      <div className="mb-12 text-center">
        <h2
          id="testimonials-heading"
          className="text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {t('heading')}
        </h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          {t('subheading')}
        </p>
      </div>

      <ul role="list" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, 3).map((item) => (
          <li key={item.id} className="h-full">
            <Card className="h-full gap-4">
              <CardHeader>
                <Stars
                  rating={item.rating}
                  label={t('ratingAria', { rating: item.rating })}
                />
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-6">
                <blockquote className="text-sm leading-relaxed text-foreground">
                  “{item.message}”
                </blockquote>
                <div className="mt-auto flex items-center gap-3">
                  <div>
                    <p className="text-sm font-medium">{maskEmail(item.email) ?? tb('anonymous')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  )
}
