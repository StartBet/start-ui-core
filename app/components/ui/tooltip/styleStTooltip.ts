import type { StTooltipPlacement, StTooltipProps } from '~/components/ui/tooltip/StTooltip.interface'

export type TooltipPosition = { top: number; left: number }

const VIEWPORT_PADDING = 8

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export const buildTooltipClasses = (props: Pick<StTooltipProps, 'className' | 'panelClassName' | 'placement'>) => {
  const { className, panelClassName, placement = 'top' } = props

  const root = ['inline-flex', className].filter(Boolean).join(' ')
  const trigger = 'inline-flex'

  const panelBase = [
    'fixed z-[1200]',
    'bg-content-din text-content-bright',
    'text-ds-xs',
    'rounded-ds-1 shadow-paper-3 p-ds-1',
    'pointer-events-auto',
    "before:content-[''] before:absolute",
    'before:border-[4px] before:border-solid before:border-transparent',
    panelClassName
  ]
    .filter(Boolean)
    .join(' ')

  const placementClass: Record<StTooltipPlacement, string> = {
    top: [
      'before:left-1/2 before:-translate-x-1/2',
      'before:bottom-[-8px]',
      'before:border-t-content-din'
    ].join(' '),
    bottom: [
      'before:left-1/2 before:-translate-x-1/2',
      'before:top-[-8px]',
      'before:border-b-content-din'
    ].join(' '),
    left: [
      'before:top-1/2 before:-translate-y-1/2',
      'before:right-[-8px]',
      'before:border-l-content-din'
    ].join(' '),
    right: [
      'before:top-1/2 before:-translate-y-1/2',
      'before:left-[-8px]',
      'before:border-r-content-din'
    ].join(' ')
  }

  const panel = [panelBase, placementClass[placement]].filter(Boolean).join(' ')

  return { root, trigger, panel }
}

export const calculateTooltipPosition = (args: {
  placement: StTooltipPlacement
  triggerRect: DOMRect
  panelRect: DOMRect
  offset: number
}): TooltipPosition => {
  const { placement, triggerRect, panelRect, offset } = args

  const triggerCenterX = triggerRect.left + triggerRect.width / 2
  const triggerCenterY = triggerRect.top + triggerRect.height / 2

  let top = triggerRect.bottom + offset
  let left = triggerCenterX - panelRect.width / 2

  if (placement === 'top') {
    top = triggerRect.top - panelRect.height - offset
    left = triggerCenterX - panelRect.width / 2
  }

  if (placement === 'left') {
    top = triggerCenterY - panelRect.height / 2
    left = triggerRect.left - panelRect.width - offset
  }

  if (placement === 'right') {
    top = triggerCenterY - panelRect.height / 2
    left = triggerRect.right + offset
  }

  if (placement === 'bottom') {
    top = triggerRect.bottom + offset
    left = triggerCenterX - panelRect.width / 2
  }

  const maxLeft = globalThis.window.innerWidth - panelRect.width - VIEWPORT_PADDING
  const maxTop = globalThis.window.innerHeight - panelRect.height - VIEWPORT_PADDING

  return {
    top: clamp(top, VIEWPORT_PADDING, Math.max(VIEWPORT_PADDING, maxTop)),
    left: clamp(left, VIEWPORT_PADDING, Math.max(VIEWPORT_PADDING, maxLeft))
  }
}
