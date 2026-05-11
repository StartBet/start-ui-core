<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue'
import type { StCheckboxProps } from '~/components/ui/form/checkbox/StCheckbox.interface'
import { buildCheckboxClasses } from '~/components/ui/form/checkbox/styleStCheckbox'

defineOptions({ name: 'StCheckbox', inheritAttrs: false })

const props = withDefaults(defineProps<StCheckboxProps>(), {
  checked: undefined,
  defaultChecked: undefined,
  disabled: false,
  label: undefined,
  className: ''
})

const emit = defineEmits<{
  (e: 'update:checked', value: boolean): void
  (e: 'change', event: Event): void
}>()

const attrs = useAttrs()
const slots = useSlots()

const isControlled = computed(() => props.checked !== undefined)
const internalChecked = ref<boolean>(props.defaultChecked ?? false)

const checkedValue = computed(() =>
  isControlled.value ? (props.checked as boolean) : internalChecked.value
)

const hasLabel = computed(() => {
  const slotNodes = slots.default?.() ?? []
  const slotHasContent = slotNodes.length > 0
  const propHasContent = props.label !== undefined && String(props.label).length > 0
  return slotHasContent || propHasContent
})

const classes = computed(() => buildCheckboxClasses(props))

const wrapperClass = computed(() => [classes.value.wrapper, attrs.class].filter(Boolean).join(' '))
const wrapperStyle = computed(() => attrs.style)

const inputAttrs = computed(() => {
  const next: Record<string, unknown> = { ...attrs }
  delete next.class
  delete next.style
  return next
})

const handleChange = (e: Event) => {
  const target = e.target instanceof HTMLInputElement ? e.target : null
  const nextChecked = target ? target.checked : !checkedValue.value

  if (!isControlled.value) internalChecked.value = nextChecked

  emit('update:checked', nextChecked)
  emit('change', e)
}
</script>

<template>
  <label :class="wrapperClass" :style="wrapperStyle">
    <input
      :class="classes.input"
      type="checkbox"
      :disabled="props.disabled"
      :checked="checkedValue"
      @change="handleChange"
      v-bind="inputAttrs"
    />
    <span :class="classes.control" aria-hidden="true">
      <span :class="classes.mark" />
    </span>
    <span v-if="hasLabel" :class="classes.label">
      <slot>{{ props.label }}</slot>
    </span>
  </label>
</template>
