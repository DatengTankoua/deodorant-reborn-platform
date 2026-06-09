import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"

import { siteConfig } from "@/config/site"

export function Footer() {
  const { author } = siteConfig

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          Built by{" "}
          <span className="font-medium text-foreground">{author.name}</span>
        </p>

        <div className="flex items-center gap-4">
          <a
            href={author.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <GithubIcon className="size-4" />
            GitHub
          </a>
          <a
            href={author.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <LinkedinIcon className="size-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
