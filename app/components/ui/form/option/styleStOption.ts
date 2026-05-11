import type { OptionClassProps } from '~/components/ui/form/option/StOption.interface'

export const buildOptionClasses = (props: OptionClassProps) => {
  const { selected = false, className } = props

  const option = [
    'appearance-none border-0 m-0 font-inherit text-left',
    'flex items-center justify-start gap-ds-1 p-ds-1',
    'text-body-small text-content-default',
    'rounded-[10px]',
    'relative overflow-hidden cursor-pointer select-none',
    'transition-colors duration-200 ease-in-out',
    selected ? 'bg-pressed' : 'hover:bg-hover active:bg-pressed',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-1 focus-visible:outline-offset-2',
    className
  ]
    .filter(Boolean)
    .join(' ')

  const startAdornment = 'inline-flex shrink-0 text-content-primary'
  const content = 'flex-1 min-w-0'
  const endAdornment = 'inline-flex shrink-0 text-content-primary'

  return { option, startAdornment, content, endAdornment }
}
