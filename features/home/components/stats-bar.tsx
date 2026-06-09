import { Star, Users, Download } from "lucide-react"

import { fetchPluginStats } from "@/lib/api/github"

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
 * horizontal bar. Falls back to zeros if the API is unavailable.
 *
 * US-002: As a potential user, I want to see live project stats
 * (GitHub stars, contributors, total downloads).
 */
export async function StatsBar() {
  const stats = await fetchPluginStats()

  return (
    <section
      aria-label="Project statistics"
      className="border-y border-border bg-muted/30 py-4"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-6 sm:gap-10">
        <StatItem
          icon={<Star className="size-4" />}
          value={formatCount(stats.stars)}
          label="GitHub Stars"
        />
        <span className="hidden h-4 w-px bg-border sm:block" aria-hidden="true" />
        <StatItem
          icon={<Users className="size-4" />}
          value={formatCount(stats.contributors)}
          label="Contributors"
        />
        <span className="hidden h-4 w-px bg-border sm:block" aria-hidden="true" />
        <StatItem
          icon={<Download className="size-4" />}
          value={formatCount(stats.totalDownloads)}
          label="Downloads"
        />
      </div>
    </section>
  )
}
