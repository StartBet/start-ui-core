import type { RadioClassProps } from '~/components/ui/form/radio/StRadio.interface'

export const buildRadioClasses = (props: RadioClassProps) => {
  const { disabled = false, className } = props

  const wrapper = [
    'inline-flex items-center gap-ds-1 select-none text-content-default',
    disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer',
    className
  ]
    .filter(Boolean)
    .join(' ')

  const input = 'absolute opacity-0 w-px h-px m-0 pointer-events-none peer'

  const control = [
    'inline-flex items-center justify-center',
    'w-ds-2 h-ds-2',
    'rounded-full',
    'border border-border-2 bg-surface-0',
    'transition-[border-color,box-shadow,background-color] duration-200 ease-in-out',
    'peer-focus-visible:border-focus peer-focus-visible:ring-2 peer-focus-visible:ring-focus peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface-0',
    'peer-checked:[&>span]:scale-100'
  ].join(' ')

  const dot = [
    'w-ds-1 h-ds-1',
    'rounded-full',
    'bg-content-primary',
    'scale-0',
    'transition-transform duration-150 ease-in-out'
  ].join(' ')

  const label = 'font-body text-body-small'

  return { wrapper, input, control, dot, label }
}
