import {
  BookOpen,
  GitBranch,
  GitPullRequest,
  Heart,
  ScrollText,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GithubIcon } from '@/components/brand-icons'
import { siteConfig } from '@/config/site'

const REPO_URL = siteConfig.plugin.sourceUrl
const ISSUES_URL = `${REPO_URL}/issues`

/** Ordered contribution steps: icon paired with its translation key prefix. */
const STEPS = [
  { key: 'step1', icon: <GitBranch className="size-5" /> },
  { key: 'step2', icon: <BookOpen className="size-5" /> },
  { key: 'step3', icon: <GitPullRequest className="size-5" /> },
] as const

/**
 * Static contribution guide — explains the fork → branch → PR workflow and
 * links to the GitHub repository, open issues, and a code of conduct note.
 * Server component; all copy is localized via next-intl.
 */
export function ContributionGuide() {
  const t = useTranslations('Community.contribution')

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-6 sm:grid-cols-3">
        {STEPS.map((step) => (
          <Card key={step.key}>
            <CardHeader>
              <div
                className="mb-2 inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
                aria-hidden="true"
              >
                {step.icon}
              </div>
              <CardTitle>
                {t(`${step.key}Title` as Parameters<typeof t>[0])}
              </CardTitle>
              <CardDescription>
                {t(`${step.key}Desc` as Parameters<typeof t>[0])}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScrollText className="size-5 text-primary" aria-hidden="true" />
            {t('cocTitle')}
          </CardTitle>
          <CardDescription>{t('cocDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row">
          <Button
            nativeButton={false}
            render={
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer" />
            }
          >
            <GithubIcon className="size-4" aria-hidden="true" />
            {t('viewRepo')}
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={
              <a href={ISSUES_URL} target="_blank" rel="noopener noreferrer" />
            }
          >
            <GithubIcon className="size-4" aria-hidden="true" />
            {t('browseIssues')}
          </Button>
          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground sm:ml-auto">
            <Heart className="size-4 text-primary" aria-hidden="true" />
            {t('everyContribution')}
          </span>
        </CardContent>
      </Card>
    </div>
  )
}
