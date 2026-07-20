'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { feedbackService } from '@/lib/api/feedbackService'
import type { FeedbackRequest } from '@/types/feedback'
import { COMMUNITY_EVENTS } from '@/features/community/lib/community'

import { StarRating } from './StarRating'

/** Lifecycle states of the submission flow. */
type Status = 'idle' | 'loading' | 'success' | 'error'

const MIN_MESSAGE_LENGTH = 10
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Controlled form for submitting user feedback (optional email, required
 * message, 1–5 star rating). Validates on submit, calls
 * {@link feedbackService.submit}, and exposes idle/loading/success/error states
 * without reloading the page. On success it notifies {@link FeedbackList} via a
 * window event so the list can re-fetch. All copy is localized via next-intl.
 */
export function FeedbackForm() {
  const t = useTranslations('Community.feedbackForm')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(0)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  const isSubmitting = status === 'loading'

  /** Validates all fields and returns an error message, or `null` when valid. */
  function validate(): string | null {
    if (message.trim().length < MIN_MESSAGE_LENGTH) {
      return t('errorMessageMin', { min: MIN_MESSAGE_LENGTH })
    }
    if (rating < 1) {
      return t('errorRatingRequired')
    }
    if (email.trim() && !EMAIL_PATTERN.test(email.trim())) {
      return t('errorEmailInvalid')
    }
    return null
  }

  /** Validates, submits the feedback, and updates UI state accordingly. */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationError = validate()
    if (validationError) {
      setStatus('error')
      setError(validationError)
      return
    }

    setStatus('loading')
    setError(null)

    const trimmedEmail = email.trim()
    const payload: FeedbackRequest = {
      message: message.trim(),
      rating,
      ...(trimmedEmail ? { email: trimmedEmail } : {}),
    }

    const { data, error: apiError } = await feedbackService.submit(payload)

    if (apiError || !data) {
      setStatus('error')
      setError(t('errorGeneric'))
      return
    }

    setStatus('success')
    setEmail('')
    setMessage('')
    setRating(0)
    window.dispatchEvent(new CustomEvent(COMMUNITY_EVENTS.feedbackSubmitted))
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label={t('ariaLabel')}
      className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6"
    >
      <div>
        <h3 className="font-semibold">{t('title')}</h3>
        <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="feedback-rating" className="text-sm font-medium">
          {t('ratingLabel')} <span className="text-destructive">*</span>
        </label>
        <div id="feedback-rating">
          <StarRating
            value={rating}
            onChange={setRating}
            label={t('ratingAria')}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="feedback-message" className="text-sm font-medium">
          {t('messageLabel')} <span className="text-destructive">*</span>
        </label>
        <Textarea
          id="feedback-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t('messagePlaceholder')}
          minLength={MIN_MESSAGE_LENGTH}
          required
          aria-required="true"
          disabled={isSubmitting}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="feedback-email" className="text-sm font-medium">
          {t('emailLabel')}{' '}
          <span className="text-muted-foreground">{t('optional')}</span>
        </label>
        <Input
          id="feedback-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          disabled={isSubmitting}
        />
      </div>

      {status === 'error' && error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      {status === 'success' && (
        <p
          role="status"
          className="flex items-center gap-2 text-sm text-green-500"
        >
          <CheckCircle2 className="size-4" aria-hidden="true" />
          {t('success')}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} className="self-start">
        {isSubmitting && (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        )}
        {isSubmitting ? t('submitting') : t('submit')}
      </Button>
    </form>
  )
}
