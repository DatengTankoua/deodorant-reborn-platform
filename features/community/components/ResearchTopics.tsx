import { Cpu, GitCompare, Gauge, Mail } from 'lucide-react'
import { useTranslations } from 'next-intl'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'

const CONTRIBUTE_EMAIL = 'datengtankoua@gmail.com'
const REPO_URL = siteConfig.plugin.sourceUrl

/** Open research topics: icon paired with its translation key prefix. */
const TOPICS = [
  { key: 'topic1', icon: <GitCompare className="size-5" /> },
  { key: 'topic2', icon: <Cpu className="size-5" /> },
  { key: 'topic3', icon: <Gauge className="size-5" /> },
] as const

/**
 * Static research section — presents open research topics as cards with a
 * contribute call-to-action. Server component; all copy is localized via
 * next-intl.
 */
export function ResearchTopics() {
  const t = useTranslations('Community.research')

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TOPICS.map((topic) => (
          <Card key={topic.key} className="h-full">
            <CardHeader>
              <div className="mb-2 flex items-center justify-between gap-2">
                <div
                  className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
                  aria-hidden="true"
                >
                  {topic.icon}
                </div>
                <Badge variant="outline">
                  {t(`${topic.key}Status` as Parameters<typeof t>[0])}
                </Badge>
              </div>
              <CardTitle>
                {t(`${topic.key}Title` as Parameters<typeof t>[0])}
              </CardTitle>
              <CardDescription>
                {t(`${topic.key}Desc` as Parameters<typeof t>[0])}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-8 text-center">
        <h3 className="text-lg font-semibold">{t('ctaTitle')}</h3>
        <p className="max-w-xl text-sm text-muted-foreground">{t('ctaDesc')}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            nativeButton={false}
            render={
              <a
                href={`mailto:${CONTRIBUTE_EMAIL}?subject=Research%20collaboration`}
              />
            }
          >
            <Mail className="size-4" aria-hidden="true" />
            {t('getInTouch')}
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer" />
            }
          >
            {t('exploreCode')}
          </Button>
        </div>
      </div>
    </div>
  )
}
