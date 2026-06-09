import { Suspense } from "react"

import { Navbar } from "@/features/navigation/components/navbar"
import { Footer } from "@/features/layout/components/footer"
import { Hero } from "@/features/home/components/hero"
import { StatsBar } from "@/features/home/components/stats-bar"
import { FeaturesSection } from "@/features/home/components/features-section"

/** Skeleton shown while GitHub stats are being fetched */
function StatsSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading project statistics"
      className="border-y border-border bg-muted/30 py-4"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-10 px-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="size-4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-8 animate-pulse rounded bg-muted" />
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Suspense fallback={<StatsSkeleton />}>
          <StatsBar />
        </Suspense>
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
