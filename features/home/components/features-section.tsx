import { ScanSearch, GitCompare, Wrench, Puzzle, Zap, ShieldCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'

type FeatureKey =
  | 'type1'
  | 'type2'
  | 'refactoring'
  | 'ide'
  | 'incremental'
  | 'research'

interface Feature {
  key: FeatureKey
  icon: React.ReactNode
}

/** Core plugin features with their icons */
const FEATURES: Feature[] = [
  { key: 'type1', icon: <ScanSearch className="size-5" /> },
  { key: 'type2', icon: <GitCompare className="size-5" /> },
  { key: 'refactoring', icon: <Wrench className="size-5" /> },
  { key: 'ide', icon: <Puzzle className="size-5" /> },
  { key: 'incremental', icon: <Zap className="size-5" /> },
  { key: 'research', icon: <ShieldCheck className="size-5" /> },
]

/**
 * Features section — US-003.
 * Displays core plugin capabilities as an accessible, keyboard-navigable card grid.
 * All strings come from the active locale's translation file.
 */
export function FeaturesSection() {
  const t = useTranslations('Features')

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="mx-auto max-w-6xl px-6 py-20"
    >
      <div className="mb-12 text-center">
        <h2
          id="features-heading"
          className="text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {t('heading')}
        </h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">{t('subheading')}</p>
      </div>

      <ul role="list" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <li
            key={feature.key}
            className="rounded-xl border border-border bg-card p-6 transition-colors hover:bg-muted/40"
          >
            <div
              className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
              aria-hidden="true"
            >
              {feature.icon}
            </div>
            <h3 className="mb-2 font-semibold">
              {t(`${feature.key}Title` as Parameters<typeof t>[0])}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t(`${feature.key}Description` as Parameters<typeof t>[0])}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

