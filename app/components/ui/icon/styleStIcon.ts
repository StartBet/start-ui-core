import type { StIconSize } from '~/components/ui/icon/StIcon.interface'

const sizeClasses: Record<StIconSize, string> = {
  1: 'text-[theme(spacing.ds-1)]',
  2: 'text-[theme(spacing.ds-2)]',
  3: 'text-[theme(spacing.ds-3)]',
  4: 'text-[theme(spacing.ds-4)]',
  5: 'text-[theme(spacing.ds-5)]',
  6: 'text-[theme(spacing.ds-6)]',
  7: 'text-[theme(spacing.ds-7)]',
  8: 'text-[theme(spacing.ds-8)]',
  9: 'text-[theme(spacing.ds-9)]',
  10: 'text-[theme(spacing.ds-10)]',
  11: 'text-[theme(spacing.ds-11)]',
  12: 'text-[theme(spacing.ds-12)]'
}

export const buildIconClasses = (props: { size?: StIconSize; className?: string }) => {
  const { size, className } = props
  return [
    'inline-flex items-center justify-center leading-none shrink-0',
    size ? sizeClasses[size] : undefined,
    className
  ]
    .filter(Boolean)
    .join(' ')
}
