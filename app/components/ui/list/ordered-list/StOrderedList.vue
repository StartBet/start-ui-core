<script setup lang="ts">
import { computed, inject, provide, reactive, useAttrs, watch } from 'vue'
import type { StListContextValue, StOrderedListProps } from '~/components/ui/list/StList.interface'
import { buildOrderedListClasses, stListContextKey } from '~/components/ui/list/styleStList'

defineOptions({ name: 'StOrderedList', inheritAttrs: false })

const props = withDefaults(defineProps<StOrderedListProps>(), {
  dense: false,
  orientation: 'vertical',
  className: ''
})

const attrs = useAttrs()

const parentContext = inject(stListContextKey, null)

const navOrientation = computed(() => parentContext?.navOrientation ?? props.orientation)
const renderOrientation = computed(() => (parentContext ? 'vertical' : navOrientation.value))
const level = computed(() => (parentContext?.level ?? 0) + 1)

const context = reactive<StListContextValue>({
  navOrientation: navOrientation.value,
  level: level.value
})

watch(
  navOrientation,
  (nextOrientation) => {
    context.navOrientation = nextOrientation
  },
  { immediate: true }
)

watch(
  level,
  (nextLevel) => {
    context.level = nextLevel
  },
  { immediate: true }
)

provide(stListContextKey, context)

const classes = computed(() => buildOrderedListClasses(props, renderOrientation.value))

const wrapperClass = computed(() => [classes.value, attrs.class].filter(Boolean).join(' '))
const wrapperStyle = computed(() => attrs.style)

const listAttrs = computed(() => {
  const next: Record<string, unknown> = { ...attrs }
  delete next.class
  delete next.style
  return next
})
</script>

<template>
  <ol :class="wrapperClass" :style="wrapperStyle" v-bind="listAttrs">
    <slot />
  </ol>
</template>
