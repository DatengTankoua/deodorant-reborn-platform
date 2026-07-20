'use client'

import { Star } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

interface StarRatingProps {
  /** Current rating value (0–5). */
  value: number
  /** Optional handler; when provided the stars become interactive. */
  onChange?: (value: number) => void
  /** Accessible label describing what is being rated. */
  label?: string
  /** Visual size of each star. */
  size?: 'sm' | 'md'
}

const MAX_STARS = 5

/**
 * Accessible 1–5 star rating.
 * - Read-only when `onChange` is omitted (renders as an `img` with a label).
 * - Interactive when `onChange` is provided (renders a radio group of buttons).
 */
export function StarRating({
  value,
  onChange,
  label = 'Rating',
  size = 'md',
}: StarRatingProps) {
  const t = useTranslations('Community.rating')
  const starClass = size === 'sm' ? 'size-4' : 'size-6'
  const interactive = typeof onChange === 'function'

  if (!interactive) {
    return (
      <div
        role="img"
        aria-label={t('readonlyAria', { label, value, max: MAX_STARS })}
        className="inline-flex items-center gap-0.5"
      >
        {Array.from({ length: MAX_STARS }, (_, i) => (
          <Star
            key={i}
            aria-hidden="true"
            className={cn(
              starClass,
              i < value
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-transparent text-muted-foreground/40',
            )}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="inline-flex items-center gap-1"
    >
      {Array.from({ length: MAX_STARS }, (_, i) => {
        const starValue = i + 1
        const selected = starValue <= value
        return (
          <button
            key={starValue}
            type="button"
            role="radio"
            aria-checked={value === starValue}
            aria-label={t('starAria', { count: starValue })}
            onClick={() => onChange(starValue)}
            className="rounded-sm p-0.5 outline-none transition-transform hover:scale-110 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Star
              aria-hidden="true"
              className={cn(
                starClass,
                selected
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-transparent text-muted-foreground/50',
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
