import type { BadgeClassProps, StBadgeSize, StBadgeVariant } from '~/components/ui/badge/StBadge.interface'

const hasValue = (value: number | string | undefined) =>
  typeof value === 'number' || (typeof value === 'string' && value.length > 0)

export const formatBadgeValue = (value: number | string | undefined) => {
  if (typeof value === 'number') return value > 99 ? '99+' : String(value)
  if (typeof value === 'string') return value.length > 4 ? `${value.slice(0, 4)}…` : value
  return undefined
}

const sizeClasses: Record<
  StBadgeSize,
  { valueContainer: string; dotContainer: string; minWidth: string; text: string }
> = {
  small: {
    valueContainer: 'h-[12px] px-[6px]',
    dotContainer: 'h-2.5 w-2.5 p-0',
    minWidth: 'min-w-2.5',
    text: 'text-ds-xs'
  },
  medium: {
    valueContainer: 'h-[16px] px-[8px]',
    dotContainer: 'h-3 w-3 p-0',
    minWidth: 'min-w-3',
    text: 'text-ds-sm'
  }
}

const variantClasses: Record<
  StBadgeVariant,
  { container: string; ring: string; text: string; dot: string }
> = {
  info: {
    container: 'bg-info',
    ring: 'border-info',
    text: 'text-content-din',
    dot: 'bg-info'
  },
  system: {
    container: 'bg-system',
    ring: 'border-system',
    text: 'text-content-bright',
    dot: 'bg-system'
  },
  warning: {
    container: 'bg-warning',
    ring: 'border-warning',
    text: 'text-content-din',
    dot: 'bg-warning'
  },
  positive: {
    container: 'bg-positive',
    ring: 'border-positive',
    text: 'text-content-din',
    dot: 'bg-positive'
  },
  negative: {
    container: 'bg-negative',
    ring: 'border-negative',
    text: 'text-content-bright',
    dot: 'bg-negative'
  }
}

export const buildBadgeClasses = (props: BadgeClassProps) => {
  const { variant = 'info', size = 'small', value, pulse = false, className } = props

  const isDot = !hasValue(value)
  const v = variantClasses[variant]
  const s = sizeClasses[size]

  const sizeContainer = isDot ? s.dotContainer : s.valueContainer
  const text = isDot ? undefined : s.text

  const container = [
    'relative inline-flex items-center justify-center rounded-full whitespace-nowrap font-body font-semibold',
    sizeContainer,
    s.minWidth,
    v.container,
    isDot ? undefined : v.text,
    text,
    className
  ]
    .filter(Boolean)
    .join(' ')

  const ring = [
    'pointer-events-none absolute inset-0 rounded-full border',
    v.ring,
    pulse ? 'animate-ping' : undefined
  ]
    .filter(Boolean)
    .join(' ')

  return { container, ring, isDot }
}
