import * as React from 'react'

import { cn } from '@/lib/utils'

interface SeparatorProps extends React.ComponentProps<'div'> {
  /** Layout axis of the separator. Defaults to `horizontal`. */
  orientation?: 'horizontal' | 'vertical'
  /** When true, the separator is purely decorative and hidden from assistive tech. */
  decorative?: boolean
}

/**
 * Thin divider line used to visually separate content.
 */
function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: SeparatorProps) {
  return (
    <div
      data-slot="separator"
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className,
      )}
      {...props}
    />
  )
}

export { Separator }
