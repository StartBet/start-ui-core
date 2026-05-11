import type { StSwitchProps } from '~/components/ui/form/switch/StSwitch.interface'

export const buildSwitchClasses = (props: StSwitchProps) => {
  const { disabled = false, className } = props

  const wrapper = [
    'relative inline-flex items-center gap-ds-1 select-none text-content-default',
    disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer',
    className
  ]
    .filter(Boolean)
    .join(' ')

  const input = 'absolute opacity-0 w-px h-px m-0 pointer-events-none peer'

  const track = [
    'relative inline-flex items-center justify-start',
    'w-[56px] h-[32px]',
    'rounded-full',
    'bg-surface-3',
    'p-[3px]',
    'transition-[border-color,box-shadow,background-color] duration-200 ease-in-out',
    'peer-checked:bg-secondary peer-checked:border-secondary',
    'peer-checked:[&_[data-switch-thumb]]:translate-x-[24px]',
    'peer-checked:[&_[data-switch-icon-off]]:text-primary',
    'peer-checked:[&_[data-switch-icon-on]]:text-surface-0',
    'peer-focus-visible:border-focus peer-focus-visible:bg-content-primary',
    'peer-focus-visible:shadow-[0_0_0_2px_color-mix(in_oklab,var(--color-focus)_100%,var(--color-surface-0))]'
  ].join(' ')

  const thumb = [
    'absolute left-[4px] top-1/2 -translate-y-1/2',
    'h-[24px] w-[24px]',
    'rounded-full',
    'bg-content-primary',
    'shadow-[0_1px_2px_color-mix(in_oklab,var(--color-shadow-0)_30%,transparent)]',
    'transition-transform duration-200 ease-in-out'
  ].join(' ')

  const iconBase = [
    'absolute inline-flex items-center justify-center',
    'top-1/2 -translate-y-1/2',
    'z-[2] pointer-events-none',
    'transition-[opacity,transform,color] duration-200 ease-in-out'
  ].join(' ')

  const iconOff = [iconBase, 'left-[9px] text-surface-0'].join(' ')
  const iconOn = [iconBase, 'right-[9px] text-content-primary'].join(' ')

  const label = 'font-body text-body-small'

  return { wrapper, input, track, thumb, iconOff, iconOn, label }
}
