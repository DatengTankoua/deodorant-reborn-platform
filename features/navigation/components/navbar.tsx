'use client'

import { Boxes } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { LocaleSwitcher } from './locale-switcher'

/**
 * Persistent navigation bar — FR-GLB-1.
 * Links are locale-aware (next-intl Link), labels are translated, and the link
 * matching the current page is highlighted in a brighter foreground color.
 */
export function Navbar() {
  const t = useTranslations('Nav')
  const pathname = usePathname()

  /**
   * Determines whether a nav item points to the currently active page.
   * The home link ("/") only matches exactly; other links also match nested
   * routes (e.g. "/community/xyz" activates "/community").
   *
   * @param href - The locale-agnostic href of the nav item.
   * @returns True when the item represents the current page.
   */
  function isActive(href: string): boolean {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 px-6"
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <Boxes className="size-5 text-primary" aria-hidden="true" />
          <span>{siteConfig.plugin.title}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex" role="list">
          {siteConfig.nav.map((item) => {
            const active = isActive(item.href)
            return (
              <li key={item.key}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground',
                    active
                      ? 'font-medium text-foreground'
                      : 'text-muted-foreground',
                  )}
                >
                  {t(item.key)}
                </Link>
              </li>
            )
          })}
        </ul>

        <LocaleSwitcher />
      </nav>
      
    </header>
  )
}

