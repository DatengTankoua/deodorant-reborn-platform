import type { ReactNode } from 'react'

/**
 * Minimal root layout required by Next.js.
 * All HTML structure (html, body, fonts, providers) lives in app/[locale]/layout.tsx.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children as React.ReactElement
}
