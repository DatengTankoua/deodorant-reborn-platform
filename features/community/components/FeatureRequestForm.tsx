'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { featureRequestService } from '@/lib/api/featureRequestService'
import type { FeatureRequestDto } from '@/types/featureRequest'
import { COMMUNITY_EVENTS } from '@/features/community/lib/community'

/** Lifecycle states of the submission flow. */
type Status = 'idle' | 'loading' | 'success' | 'error'

const MIN_DESCRIPTION_LENGTH = 20
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Controlled form for submitting a feature request (required title, required
 * description, optional email). Validates on submit, calls
 * {@link featureRequestService.submit}, and exposes idle/loading/success/error
 * states without reloading the page. On success it notifies
 * {@link FeatureRequestList} via a window event so the list can re-fetch.
 */
export function FeatureRequestForm() {
  const t = useTranslations('Community.featureForm')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  const isSubmitting = status === 'loading'

  /** Validates all fields and returns an error message, or `null` when valid. */
  function validate(): string | null {
    if (!title.trim()) {
      return t('errorTitleRequired')
    }
    if (description.trim().length < MIN_DESCRIPTION_LENGTH) {
      return t('errorDescriptionMin', { min: MIN_DESCRIPTION_LENGTH })
    }
    if (email.trim() && !EMAIL_PATTERN.test(email.trim())) {
      return t('errorEmailInvalid')
    }
    return null
  }

  /** Validates, submits the feature request, and updates UI state. */
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
    const payload: FeatureRequestDto = {
      title: title.trim(),
      description: description.trim(),
      ...(trimmedEmail ? { email: trimmedEmail } : {}),
    }

    const { data, error: apiError } = await featureRequestService.submit(payload)

    if (apiError || !data) {
      setStatus('error')
      setError(t('errorGeneric'))
      return
    }

    setStatus('success')
    setTitle('')
    setDescription('')
    setEmail('')
    window.dispatchEvent(
      new CustomEvent(COMMUNITY_EVENTS.featureRequestSubmitted),
    )
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
        <label htmlFor="feature-title" className="text-sm font-medium">
          {t('titleLabel')} <span className="text-destructive">*</span>
        </label>
        <Input
          id="feature-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t('titlePlaceholder')}
          required
          aria-required="true"
          disabled={isSubmitting}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="feature-description" className="text-sm font-medium">
          {t('descriptionLabel')} <span className="text-destructive">*</span>
        </label>
        <Textarea
          id="feature-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t('descriptionPlaceholder')}
          minLength={MIN_DESCRIPTION_LENGTH}
          required
          aria-required="true"
          disabled={isSubmitting}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="feature-email" className="text-sm font-medium">
          {t('emailLabel')}{' '}
          <span className="text-muted-foreground">{t('optional')}</span>
        </label>
        <Input
          id="feature-email"
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
