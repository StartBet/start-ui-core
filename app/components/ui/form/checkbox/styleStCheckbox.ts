import type { StCheckboxProps } from '~/components/ui/form/checkbox/StCheckbox.interface'

export const buildCheckboxClasses = (props: StCheckboxProps) => {
  const { disabled = false, className } = props

  const wrapper = [
    'relative inline-flex items-center gap-ds-1 select-none text-content-default',
    disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer',
    className
  ]
    .filter(Boolean)
    .join(' ')

  const input = 'absolute opacity-0 w-px h-px m-0 pointer-events-none peer'

  const control = [
    'inline-flex items-center justify-center',
    'w-ds-2 h-ds-2',
    'rounded-[4px]',
    'border border-border-1',
    'transition-[border-color,box-shadow,background-color] duration-200 ease-in-out',
    'peer-focus-visible:border-focus peer-focus-visible:ring-2 peer-focus-visible:ring-focus peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface-0',
    'peer-checked:[&>span]:scale-100'
  ].join(' ')

  const mark = [
    'w-[5px] h-[8px]',
    'border-b-[3px] border-r-[3px] border-solid border-current',
    'text-content-primary',
    'rotate-45 scale-0 -translate-x-px -translate-y-px',
    'transition-transform duration-150 ease-in-out'
  ].join(' ')

  const label = 'font-body text-body-small'

  return { wrapper, input, control, mark, label }
}
