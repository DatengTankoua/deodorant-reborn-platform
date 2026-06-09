import { Star, Users, Download } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { fetchPluginStats } from '@/lib/api/github'

/**
 * Formats a large number into a compact human-readable string.
 * Examples: 1200 → "1.2k", 999 → "999"
 */
function formatCount(value: number): string {
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`
  return value.toString()
}

interface StatItemProps {
  icon: React.ReactNode
  label: string
  value: string
}

/**
 * A single statistic item rendered inside the stats bar.
 */
function StatItem({ icon, label, value }: StatItemProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground" aria-hidden="true">
        {icon}
      </span>
      <span className="text-sm font-medium tabular-nums">{value}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  )
}

/**
 * Server Component — fetches live GitHub stats and renders them as a
 * horizontal bar with translated labels. Falls back to zeros if the API
 * is unavailable (US-002).
 */
export async function StatsBar() {
  const [stats, t] = await Promise.all([
    fetchPluginStats(),
    getTranslations('StatsBar'),
  ])

  return (
    <section
      aria-label={t('ariaLabel')}
      className="border-y border-border bg-muted/30 py-4"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-6 sm:gap-10">
        <StatItem
          icon={<Star className="size-4" />}
          value={formatCount(stats.stars)}
          label={t('stars')}
        />
        <span className="hidden h-4 w-px bg-border sm:block" aria-hidden="true" />
        <StatItem
          icon={<Users className="size-4" />}
          value={formatCount(stats.contributors)}
          label={t('contributors')}
        />
        <span className="hidden h-4 w-px bg-border sm:block" aria-hidden="true" />
        <StatItem
          icon={<Download className="size-4" />}
          value={formatCount(stats.totalDownloads)}
          label={t('downloads')}
        />
      </div>
    </section>
  )
}

