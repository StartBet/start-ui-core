import type {
  ButtonClassProps,
  ButtonColor,
  ButtonSize,
  ButtonVariant
} from '~/components/ui/buttom/button/StButton.interface'

const sizeClasses: Record<ButtonSize, { container: string; iconOnly: string; contentPadding: string }> =
  {
    small: { container: 'h-8 text-ds-sm', iconOnly: 'w-8 px-0', contentPadding: 'px-ds-2' },
    medium: { container: 'h-10 text-ds-base', iconOnly: 'w-10 px-0', contentPadding: 'px-ds-2' },
    large: { container: 'h-12 text-ds-md', iconOnly: 'w-12 px-0', contentPadding: 'px-ds-2' }
  }


const solidClasses: Record<ButtonColor, string> = {
  primary:
    'bg-primary text-content-bright border border-primary hover:opacity-90 active:opacity-80',
  secondary:
    'bg-secondary text-brand border border-content-secondary hover:opacity-90 active:opacity-80',
  positive:
    'bg-positive text-content-din border border-content-positive hover:opacity-90 active:opacity-80',
  negative:
    'bg-negative text-content-bright border border-content-negative hover:opacity-90 active:opacity-80'
}

const outlineClasses: Record<ButtonColor, string> = {
  primary:
    'bg-transparent text-content-primary border border-content-primary hover:bg-hover active:bg-pressed',
  secondary:
    'bg-transparent text-content-secondary border border-content-secondary hover:bg-hover active:bg-pressed',
  positive:
    'bg-transparent text-content-positive border border-content-positive hover:bg-hover active:bg-pressed',
  negative:
    'bg-transparent text-content-negative border border-content-negative hover:bg-hover active:bg-pressed'
}

const textClasses: Record<ButtonColor, string> = {
  primary:
    'bg-transparent text-content-primary border border-transparent hover:bg-hover active:bg-pressed',
  secondary:
    'bg-transparent text-content-secondary border border-transparent hover:bg-hover active:bg-pressed',
  positive:
    'bg-transparent text-content-positive border border-transparent hover:bg-hover active:bg-pressed',
  negative:
    'bg-transparent text-content-negative border border-transparent hover:bg-hover active:bg-pressed'
}

const variantClasses: Record<ButtonVariant, Record<ButtonColor, string>> = {
  solid: solidClasses,
  outline: outlineClasses,
  text: textClasses
}

export const buildButtonClasses = (
  props: ButtonClassProps & { isIconOnly?: boolean }
): { container: string; content: string } => {
  const {
    variant = 'solid',
    size = 'medium',
    color = 'primary',
    disabled = false,
    fullWidth = false,
    isIconOnly = false,
    className
  } = props

  const base = [
    'relative inline-flex items-center overflow-hidden rounded-ds-1 font-body font-semibold transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0 disabled:cursor-not-allowed',
    isIconOnly ? 'justify-center' : 'justify-between',
  ]
    .filter(Boolean)
    .join(' ')



  const s = sizeClasses[size]

  const disabledClasses =
    'bg-surface-3 text-content-disable border border-border-2 cursor-not-allowed opacity-80'

  const container = [
    base,
    s.container,
    isIconOnly ? s.iconOnly : undefined,
    !isIconOnly && fullWidth ? 'w-full' : undefined,
    disabled ? disabledClasses : variantClasses[variant][color],
    className
  ]
    .filter(Boolean)
    .join(' ')

  const content = [
    'relative z-10 inline-flex items-center gap-ds-1',
    isIconOnly ? 'px-0' : s.contentPadding
  ]
    .filter(Boolean)
    .join(' ')

  return { container, content }
}
