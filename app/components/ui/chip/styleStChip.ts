import type { ChipClassProps, StChipVariant } from '~/components/ui/chip/StChip.interface'

const variantClasses: Record<StChipVariant, string> = {
  primary: 'text-surface-primary bg-content-primary border-content-primary',
  secondary: 'text-surface-secondary bg-content-secondary border-content-secondary',
  info: 'text-surface-info bg-content-info border-content-info',
  system: 'text-surface-system bg-content-system border-content-system',
  warning: 'text-surface-warning bg-content-warning border-content-warning',
  positive: 'text-surface-positive bg-content-positive border-content-positive',
  negative: 'text-surface-negative bg-content-negative border-content-negative'
}

export const buildChipClasses = (props: ChipClassProps) => {
  const { variant = 'primary', clickable = false, className } = props

  const container = [
    'inline-flex items-center gap-ds-1 rounded-ds-1 px-ds-1 h-ds-3',
    'font-body text-ds-xs font-semibold',
    'border border-transparent',
    'text-content-default',
    variantClasses[variant],
    clickable
      ? [
          'relative overflow-hidden cursor-pointer select-none',
          'transition-opacity duration-200 ease-in-out',
          'hover:opacity-90 active:opacity-80',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0'
        ].join(' ')
      : undefined,
    className
  ]
    .filter(Boolean)
    .join(' ')

  const closeButton = [
    'inline-flex items-center justify-center',
    'rounded-full p-0 bg-transparent text-current',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0'
  ].join(' ')

  return { container, closeButton }
}
