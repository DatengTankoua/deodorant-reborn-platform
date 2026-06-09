import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

/**
 * Locale-aware navigation utilities.
 * Import Link, redirect, usePathname, useRouter from here
 * instead of next/link or next/navigation to get automatic locale prefixing.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
