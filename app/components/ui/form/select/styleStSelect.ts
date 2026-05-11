import { isVNode } from 'vue'
import type { SelectClassProps } from '~/components/ui/form/select/StSelect.interface'

export const extractText = (node: unknown): string => {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(extractText).join('').trim()
  if (isVNode(node)) return extractText(node.children)
  if (node && typeof node === 'object') {
    const maybeChildren = (node as { children?: unknown }).children
    if (maybeChildren !== undefined) return extractText(maybeChildren)
  }
  return ''
}

export const buildSelectClasses = (props: SelectClassProps) => {
  const {
    className,
    panelClassName,
    hasIcon,
    isOpen,
    isValid,
    hasValue,
    disabled = false
  } = props

  const wrapper = ['flex flex-col gap-ds-1', className].filter(Boolean).join(' ')
  const label = ['font-body text-body-small', 'text-content-default'].join(' ')

  const dropdownRoot = 'w-full block'
  const dropdownPanel = [
    'w-full p-ds-1 max-h-[280px] overflow-auto',
    panelClassName
  ]
    .filter(Boolean)
    .join(' ')

  const trigger = 'w-full block'

  const input = [
    'w-full h-10',
    'rounded-ds-1 border',
    'bg-surface-0 text-content-default',
    'px-ds-2',
    hasIcon ? 'pl-ds-6' : undefined,
    'outline-none',
    'flex items-center gap-ds-2 text-left',
    'transition-[border-color,box-shadow] duration-200 ease-in-out',
    'focus-visible:border-content-primary focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0',
    disabled ? 'bg-surface-3 text-content-disable border-border-2 cursor-not-allowed' : 'border-border-2',
    !disabled && isValid === false ? 'border-negative' : undefined
  ]
    .filter(Boolean)
    .join(' ')

  const iconContainer = [
    'absolute inset-1 w-ds-4 h-ds-4',
    'inline-flex items-center justify-center',
    'bg-primary text-secondary',
    'rounded-ds-1 shrink-0'
  ].join(' ')

  const value = 'flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap'
  const placeholder = 'text-content-ghost'

  const chevron = [
    'text-content-ghost shrink-0 transition-transform duration-200 ease-in-out',
    isOpen ? 'rotate-180' : 'rotate-0'
  ].join(' ')

  const options = 'grid gap-ds-1'
  const optionActive = 'bg-hover'

  const messageBase = ['text-ds-xs', 'inline-flex items-center gap-ds-1'].join(' ')
  const messageInfo = [messageBase, 'text-content-info'].join(' ')
  const messageDanger = [messageBase, 'text-content-negative'].join(' ')
  const messageSuccess = [messageBase, 'text-content-positive'].join(' ')

  return {
    wrapper,
    label,
    dropdownRoot,
    trigger,
    dropdownPanel,
    input,
    iconContainer,
    value,
    placeholder,
    chevron,
    options,
    optionActive,
    messageInfo,
    messageDanger,
    messageSuccess,
    hasValue
  }
}
