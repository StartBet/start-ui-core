import { sizeWidthClasses } from '~/types/Spacing'
import type {
  DropdownClassProps,
  StDropdownPlacement
} from '~/components/ui/dropdown/StDropdown.interface'

export type DropdownPosition = { top: number; left: number }

const VIEWPORT_PADDING = 8

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export const buildDropdownClasses = (props: DropdownClassProps) => {
  const { className, panelClassName, width = 'auto' } = props

  const root = ['inline-block', className].filter(Boolean).join(' ')

  const panel = [
    'fixed z-[1200] m-0',
    'bg-surface-0 text-content-default',
    'border border-border-2 rounded-ds-1',
    'shadow-paper-3 p-ds-1',
    width === 'full' ? undefined : sizeWidthClasses[width],
    panelClassName
  ]
    .filter(Boolean)
    .join(' ')

  const trigger =
    'inline-flex bg-transparent border-0 p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0'

  return { root, panel, trigger }
}

export const resolvePlacement = (
  preferred: StDropdownPlacement,
  triggerRect: DOMRect,
  panelRect: DOMRect
): Exclude<StDropdownPlacement, 'auto'> => {
  if (preferred !== 'auto') return preferred

  const spaceBelow = window.innerHeight - triggerRect.bottom - VIEWPORT_PADDING
  const spaceAbove = triggerRect.top - VIEWPORT_PADDING

  if (spaceBelow >= panelRect.height || spaceBelow >= spaceAbove) return 'bottom'
  return 'top'
}

export const calculateDropdownPosition = (args: {
  placement: StDropdownPlacement
  triggerRect: DOMRect
  panelRect: DOMRect
  offset: number
}): DropdownPosition => {
  const { placement, triggerRect, panelRect, offset } = args

  const finalPlacement = resolvePlacement(placement, triggerRect, panelRect)

  let top = triggerRect.bottom + offset
  let left = triggerRect.left

  if (finalPlacement === 'top') {
    top = triggerRect.top - panelRect.height - offset
    left = triggerRect.left
  }

  if (finalPlacement === 'left') {
    top = triggerRect.top
    left = triggerRect.left - panelRect.width - offset
  }

  if (finalPlacement === 'right') {
    top = triggerRect.top
    left = triggerRect.right + offset
  }

  const maxLeft = window.innerWidth - panelRect.width - VIEWPORT_PADDING
  const maxTop = window.innerHeight - panelRect.height - VIEWPORT_PADDING

  return {
    top: clamp(top, VIEWPORT_PADDING, Math.max(VIEWPORT_PADDING, maxTop)),
    left: clamp(left, VIEWPORT_PADDING, Math.max(VIEWPORT_PADDING, maxLeft))
  }
}
