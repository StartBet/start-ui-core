import type { InjectionKey } from 'vue'
import type {
  StListContextValue,
  StListItemProps,
  StOrderedListProps,
  StUnorderedListProps
} from '~/components/ui/list/StList.interface'

export const stListContextKey: InjectionKey<StListContextValue> = Symbol('StListContext')

export const buildUnorderedListClasses = (props: StUnorderedListProps, renderOrientation: string) => {
  const { dense = false, className } = props

  const base = ['list-none m-0 p-0 flex', className].filter(Boolean).join(' ')

  const gap = dense ? 'gap-0' : 'gap-ds-1'

  const orientation =
    renderOrientation === 'horizontal'
      ? 'flex-row items-center flex-wrap'
      : 'flex-col items-stretch'

  return [base, orientation, gap].filter(Boolean).join(' ')
}

export const buildOrderedListClasses = (props: StOrderedListProps, renderOrientation: string) => {
  const { dense = false, className } = props

  const base = ['m-0 flex', className].filter(Boolean).join(' ')

  const gap = (() => {
    if (dense) return 'gap-0'
    if (renderOrientation === 'horizontal') return 'gap-ds-2'
    return 'gap-ds-1'
  })()

  const orientation =
    renderOrientation === 'horizontal'
      ? 'flex-row items-center flex-wrap list-none pl-0'
      : 'flex-col items-stretch list-decimal pl-ds-4'

  return [base, orientation, gap].filter(Boolean).join(' ')
}

const getListItemSizeClass = (size: StListItemProps['size']) => {
  if (size === 'small') return 'p-ds-1 text-ds-sm'
  if (size === 'large') return 'p-ds-2 text-ds-md'
  return 'py-ds-1 px-ds-1 text-ds-base'
}

const getListItemSubItemClass = (isSubItem: boolean, navOrientation: string) => {
  const shouldShow = isSubItem && navOrientation !== 'horizontal'
  if (!shouldShow) return ''
  return [
    "before:content-[''] before:absolute before:right-full before:top-1/2 before:-translate-y-1/2",
    'before:w-ds-1 before:h-px before:bg-border-2'
  ].join(' ')
}

const getListItemMainClass = () => 'flex items-center'

const getListItemDividerClass = (divider: boolean, selected: boolean) => {
  if (!divider) return ''
  return [
    'border-b border-border-3 rounded-b-none',
    "before:content-[''] before:absolute before:left-0 before:bottom-[-1px] before:w-full before:h-[2px]",
    'before:bg-secondary before:origin-center before:scale-x-0',
    'before:transition-transform before:duration-300 before:ease-in-out',
    'after:rounded-b-none',
    selected ? 'before:scale-x-100' : 'hover:before:scale-x-100'
  ].join(' ')
}

const getListItemSubListClass = (hasSubItems: boolean, navOrientation: string, expanded: boolean) => {
  if (!hasSubItems) return ''
  const display = navOrientation !== 'horizontal' && expanded ? 'block' : 'hidden'
  return [display].filter(Boolean).join(' ')
}

export const buildListItemClasses = (
  props: StListItemProps,
  options: { isSubItem: boolean; hasSubItems: boolean; expanded: boolean; navOrientation: string }
) => {
  const {
    dense = false,
    divider = false,
    selected = false,
    disabled = false,
    clickable = false,
    size = 'medium',
    className
  } = props

  const sizeClass = getListItemSizeClass(size)

  const denseClass = dense ? 'py-ds-1 px-[12px]' : ''

  const disabledClass = disabled ? 'opacity-60' : ''

  const listItem = [
    'relative flex flex-col items-stretch text-content-default',
    disabledClass,
    className
  ]
    .filter(Boolean)
    .join(' ')

  const main = getListItemMainClass()

  const actionDividerClass = getListItemDividerClass(divider, selected)

  const actionSelectedClass = selected ? 'bg-pressed' : ''

  const mainActionBase = [
    'relative z-[1] flex items-center gap-[var(--st-list-item-gap,theme(spacing.ds-1))]',
    'flex-1 min-w-0 rounded-[10px]',
    sizeClass,
    denseClass,
    actionDividerClass,
    actionSelectedClass
  ]
    .filter(Boolean)
    .join(' ')

  const mainActionInteractive = [
    mainActionBase,
    'appearance-none m-0 border-0 bg-transparent text-left',
    'font-inherit text-inherit cursor-pointer select-none',
    "after:content-[''] after:absolute after:inset-0 after:rounded-[10px]",
    'after:bg-hover after:opacity-0 after:transition-opacity hover:after:opacity-100',
    'active:after:bg-pressed active:after:opacity-100',
    options.hasSubItems ? 'after:rounded-r-none' : '',
    disabled ? 'pointer-events-none' : '',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-1 focus-visible:outline-offset-2'
  ]
    .filter(Boolean)
    .join(' ')

  const startAdornment = 'inline-flex shrink-0 text-content-primary'
  const endAdornment = 'inline-flex shrink-0 text-content-primary'
  const content = 'flex-1 min-w-0'

  const subMenuButton = [
    'shrink-0',
    'rounded-l-none',
    '[&_svg]:transition-transform',
    'data-[open=true]:[&_svg]:rotate-180',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-1 focus-visible:outline-offset-2'
  ].join(' ')

  const subList = getListItemSubListClass(options.hasSubItems, options.navOrientation, options.expanded)

  const subMenuPanel = 'p-0'

  return {
    listItem,
    main,
    mainActionBase,
    mainActionInteractive,
    startAdornment,
    endAdornment,
    content,
    subMenuButton,
    subList,
    subMenuPanel
  }
}
