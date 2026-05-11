<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onBeforeUnmount, onMounted, ref, useAttrs, useId, watch } from 'vue'
import type {
  StTooltipPlacement,
  StTooltipProps,
  StTooltipTriggerProps
} from '~/components/ui/tooltip/StTooltip.interface'
import { buildTooltipClasses, calculateTooltipPosition } from '~/components/ui/tooltip/styleStTooltip'

defineOptions({ name: 'StTooltip', inheritAttrs: false })

const props = withDefaults(defineProps<StTooltipProps>(), {
  className: '',
  panelClassName: '',
  placement: 'top',
  offset: 8,
  open: undefined,
  defaultOpen: false,
  onOpenChange: undefined,
  disabled: false,
  triggerProps: undefined
})

defineSlots<{
  trigger?: () => unknown
  default?: () => unknown
}>()

const emit = defineEmits<{
  (e: 'update:open', open: boolean): void
  (e: 'open-change', open: boolean): void
}>()

const attrs = useAttrs()

const generatedId = useId()
const panelId = `st-tooltip-${generatedId}`

const rootRef = ref<HTMLSpanElement | null>(null)
const triggerRef = ref<HTMLSpanElement | null>(null)
const panelRef = ref<HTMLDivElement | null>(null)

const internalOpen = ref<boolean>(props.defaultOpen)
const instance = getCurrentInstance()
const isControlled = computed(() => {
  const vnodeProps = instance?.vnode.props
  return vnodeProps ? Object.hasOwn(vnodeProps, 'open') : false
})

const isOpen = computed(() => (isControlled.value ? Boolean(props.open) : internalOpen.value))

const isBrowser = globalThis.window !== undefined && globalThis.document !== undefined

const position = ref({ top: 0, left: 0 })

const classes = computed(() => buildTooltipClasses(props))

const rootClass = computed(() => [classes.value.root, attrs.class].filter(Boolean).join(' '))
const rootStyle = computed(() => attrs.style)

const rootAttrs = computed(() => {
  const next: Record<string, unknown> = { ...attrs }
  delete next.class
  delete next.style
  delete next.onMouseenter
  delete next.onMouseleave
  delete next.onFocus
  delete next.onBlur
  delete next.onFocusin
  delete next.onFocusout
  delete next.onKeydown
  delete next.onKeyDown
  return next
})

const triggerUserProps = computed<StTooltipTriggerProps>(() => props.triggerProps ?? {})

const triggerClass = computed(() =>
  [classes.value.trigger, triggerUserProps.value.className].filter(Boolean).join(' ')
)

const triggerAttrs = computed(() => {
  const next: Record<string, unknown> = { ...triggerUserProps.value }
  delete next.className
  delete next.onMouseenter
  delete next.onMouseleave
  delete next.onFocus
  delete next.onBlur
  delete next.onKeydown
  delete next.onKeyDown
  return next
})

const setOpen = (next: boolean) => {
  if (props.disabled) return
  if (!isControlled.value) internalOpen.value = next
  props.onOpenChange?.(next)
  emit('open-change', next)
  emit('update:open', next)
}

const updatePosition = () => {
  if (!isBrowser) return
  const triggerEl = triggerRef.value
  const panelEl = panelRef.value
  if (!triggerEl || !panelEl) return

  const triggerRect = triggerEl.getBoundingClientRect()
  const panelRect = panelEl.getBoundingClientRect()

  position.value = calculateTooltipPosition({
    placement: props.placement as StTooltipPlacement,
    triggerRect,
    panelRect,
    offset: props.offset
  })
}

const onReposition = () => updatePosition()

let resizeObserver: ResizeObserver | undefined

watch(
  () => [isOpen.value, props.placement, props.offset],
  async ([open]) => {
    if (!open) return
    await nextTick()
    updatePosition()
  }
)

watch(
  () => isOpen.value,
  async (open) => {
    if (!isBrowser) return
    globalThis.window.removeEventListener('resize', onReposition)
    globalThis.window.removeEventListener('scroll', onReposition, true)
    resizeObserver?.disconnect()
    resizeObserver = undefined

    if (!open) return

    await nextTick()
    updatePosition()

    globalThis.window.addEventListener('resize', onReposition)
    globalThis.window.addEventListener('scroll', onReposition, true)

    const panelEl = panelRef.value
    const triggerEl = triggerRef.value
    if (panelEl && triggerEl && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => updatePosition())
      resizeObserver.observe(panelEl)
      resizeObserver.observe(triggerEl)
    }
  },
  { immediate: true }
)

watch(
  () => props.disabled,
  (next) => {
    if (!next) return
    if (isOpen.value) setOpen(false)
  }
)

onMounted(() => {
  if (!isBrowser) return
  if (isOpen.value) updatePosition()
})

onBeforeUnmount(() => {
  if (!isBrowser) return
  globalThis.window.removeEventListener('resize', onReposition)
  globalThis.window.removeEventListener('scroll', onReposition, true)
  resizeObserver?.disconnect()
})

const panelStyle = computed<Record<string, string>>(() => ({
  top: `${position.value.top}px`,
  left: `${position.value.left}px`
}))

const onRootMouseEnter = (e: MouseEvent) => {
  if (props.disabled) return
  setOpen(true)
  triggerUserProps.value.onMouseenter?.(e)
}

const onRootMouseLeave = (e: MouseEvent) => {
  setOpen(false)
  triggerUserProps.value.onMouseleave?.(e)
}

const onRootFocusIn = (e: FocusEvent) => {
  if (props.disabled) return
  setOpen(true)
  triggerUserProps.value.onFocus?.(e)
}

const onRootFocusOut = (e: FocusEvent) => {
  setOpen(false)
  triggerUserProps.value.onBlur?.(e)
}

const onRootKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isOpen.value) {
    e.preventDefault()
    setOpen(false)
  }
  const handler = triggerUserProps.value.onKeydown ?? triggerUserProps.value.onKeyDown
  handler?.(e)
}
</script>

<template>
  <span
    ref="rootRef"
    :class="rootClass"
    :style="rootStyle"
    v-bind="rootAttrs"
    @mouseenter="onRootMouseEnter"
    @mouseleave="onRootMouseLeave"
    @focusin="onRootFocusIn"
    @focusout="onRootFocusOut"
    @keydown="onRootKeyDown"
  >
    <span
      ref="triggerRef"
      :class="triggerClass"
      :aria-describedby="isOpen ? panelId : undefined"
      v-bind="triggerAttrs"
    >
      <slot name="trigger" />
    </span>

    <div v-if="isOpen" ref="panelRef" :id="panelId" role="tooltip" :class="classes.panel" :style="panelStyle">
      <slot />
    </div>
  </span>
</template>
