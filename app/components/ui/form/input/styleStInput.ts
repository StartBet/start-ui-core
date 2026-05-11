import type { StInputMask, StInputProps } from '~/components/ui/form/input/StInput.interface'

export const applyInputMask = (mask: StInputMask | undefined, raw: string): string => {
  if (!mask) return raw

  if (mask === 'phone-br') {
    const digits = raw.replaceAll(/\D/g, '').slice(0, 11)
    if (digits.length === 0) return ''

    const ddd = digits.slice(0, 2)
    const rest = digits.slice(2)

    if (rest.length === 0) return `(${ddd}`
    if (rest.length <= 4) return `(${ddd}) ${rest}`

    if (rest.length <= 8) {
      const p1 = rest.slice(0, 4)
      const p2 = rest.slice(4)
      const suffix = p2 ? `-${p2}` : ''
      return `(${ddd}) ${p1}${suffix}`
    }

    const p1 = rest.slice(0, 5)
    const p2 = rest.slice(5)
    const suffix = p2 ? `-${p2}` : ''
    return `(${ddd}) ${p1}${suffix}`
  }

  return raw
}

export const buildInputClasses = (props: {
  disabled?: boolean
  isValid?: boolean
  hasIcon?: boolean
  hasCounter?: boolean
  className?: string
}) => {
  const { disabled = false, isValid = true, hasIcon = false, hasCounter = false, className } =
    props
  const isEnabled = disabled === false
  const isInvalid = isEnabled && isValid === false

  const wrapper = 'flex flex-col gap-ds-1'

  const label = ['font-body text-body-small', 'text-content-default'].join(' ')

  const inputContainer = 'relative'

  const iconContainer = [
    'absolute inset-1 w-ds-4',
    'flex items-center justify-center',
    'rounded-ds-1',
    'bg-primary text-secondary'
  ].join(' ')

  const inputBase = [
    'w-full h-10',
    'rounded-ds-1 border',
    'bg-surface-0 text-content-default',
    'px-ds-2',
    hasIcon ? 'pl-ds-6' : undefined,
    hasCounter ? 'pr-ds-5' : undefined,
    'outline-none',
    'transition-[border-color,box-shadow] duration-200 ease-in-out',
    'placeholder:text-content-ghost',
    'focus:border-content-primary focus:ring-2 focus:ring-focus focus:ring-offset-2 focus:ring-offset-surface-0',
    disabled
      ? 'bg-surface-3 text-content-disable border-border-2 cursor-not-allowed'
      : 'border-border-2',
    isInvalid ? 'border-negative' : undefined,
    className
  ]
    .filter(Boolean)
    .join(' ')

  const messageBase = ['text-ds-xs', 'inline-flex items-center gap-ds-1'].join(' ')

  const messageInfo = [messageBase, 'text-content-info'].join(' ')
  const messageDanger = [messageBase, 'text-content-negative'].join(' ')
  const messageSuccess = [messageBase, 'text-content-positive'].join(' ')

  const counterBase = [
    'absolute right-ds-2 top-1/2 -translate-y-1/2',
    'text-ds-xs text-content-ghost',
    'pointer-events-none'
  ].join(' ')

  const counterWarn = [counterBase, 'text-content-warning'].join(' ')
  const counterNegative = [counterBase, 'text-content-negative'].join(' ')

  return {
    wrapper,
    label,
    inputContainer,
    iconContainer,
    input: inputBase,
    messageInfo,
    messageDanger,
    messageSuccess,
    counterBase,
    counterWarn,
    counterNegative
  }
}

export const getCounterClassName = (
  maxLength: number,
  charCount: number,
  classes: ReturnType<typeof buildInputClasses>
) => {
  const remaining = Math.max(0, maxLength - charCount)
  if (remaining === 0) return classes.counterNegative
  if (remaining <= 3) return classes.counterWarn
  return classes.counterBase
}

export const resolveInputType = (type: StInputProps['type']) =>
  type === 'datetime' ? 'datetime-local' : (type ?? 'text')
