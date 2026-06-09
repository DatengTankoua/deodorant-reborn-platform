import Link from "next/link"
import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { GithubIcon } from "@/components/brand-icons"
import { siteConfig } from "@/config/site"

export function Hero() {
  const { plugin } = siteConfig

  return (
    <section className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-3xl flex-col items-center justify-center gap-8 px-6 py-24 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
        <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
        IntelliJ Platform Plugin
      </div>

      <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
        {plugin.title}
      </h1>

      <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
        {plugin.description}
      </p>

      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Button
          size="lg"
          nativeButton={false}
          render={
            <a href={plugin.downloadUrl} target="_blank" rel="noopener noreferrer" />
          }
        >
          <Download aria-hidden="true" />
          Download Plugin
        </Button>
        <Button
          size="lg"
          variant="outline"
          nativeButton={false}
          render={
            <a href={plugin.sourceUrl} target="_blank" rel="noopener noreferrer" />
          }
        >
          <GithubIcon className="size-4" aria-hidden="true" />
          View Source
        </Button>
      </div>
    </section>
  )
}
