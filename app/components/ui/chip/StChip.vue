<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import StIcon from '~/components/ui/icon/StIcon.vue'
import type { StChipVariant } from '~/components/ui/chip/StChip.interface'
import { buildChipClasses } from '~/components/ui/chip/styleStChip'

const props = withDefaults(
  defineProps<{
    variant?: StChipVariant
    clickable?: boolean
    closable?: boolean
    onClose?: () => void
    className?: string
  }>(),
  {
    variant: 'primary',
    clickable: false,
    closable: false,
    className: ''
  }
)

const emit = defineEmits<{
  (e: 'click', event: MouseEvent | KeyboardEvent): void
}>()

const attrs = useAttrs()

const classes = computed(() => buildChipClasses(props))

const filteredAttrs = computed(() => {
  const next: Record<string, unknown> = { ...attrs }
  delete next.onClick
  delete next.onKeydown
  delete next.onKeyDown
  return next
})

const handleClick = (e: MouseEvent) => {
  if (!props.clickable) return
  emit('click', e)
}

const handleKeydown = (e: KeyboardEvent) => {
  if (!props.clickable) return
  if (e.key !== 'Enter' && e.key !== ' ') return
  e.preventDefault()
  emit('click', e)
}

const handleClose = () => {
  props.onClose?.()
}
</script>

<template>
  <div
    :class="classes.container"
    :role="props.clickable ? 'button' : undefined"
    :tabindex="props.clickable ? 0 : undefined"
    @click="handleClick"
    @keydown="handleKeydown"
    v-bind="filteredAttrs"
  >
    <span><slot /></span>
    <button
      v-if="props.closable"
      type="button"
      :class="classes.closeButton"
      aria-label="Close"
      @click.stop="handleClose"
    >
      <StIcon name="times" :size="1" />
    </button>
  </div>
</template>
