<script setup lang="ts">
import { computed, provide, ref, useAttrs, useId, watch } from 'vue'
import type { StRadioGroupProps } from '~/components/ui/form/radio-group/StRadioGroup.interface'
import { buildRadioGroupClasses, radioGroupContextKey } from '~/components/ui/form/radio-group/styleStRadioGroup'

defineOptions({ name: 'StRadioGroup', inheritAttrs: false })

const props = withDefaults(defineProps<StRadioGroupProps>(), {
  name: undefined,
  value: undefined,
  defaultValue: undefined,
  onValueChange: undefined,
  disabled: false,
  dense: false,
  orientation: 'vertical',
  className: ''
})

const emit = defineEmits<{
  (e: 'update:value', value: string): void
  (e: 'value-change', value: string): void
}>()

const attrs = useAttrs()

const generatedName = useId()
const groupName = computed(() => props.name ?? `st-radio-group-${generatedName}`)

const isControlled = computed(() => props.value !== undefined)
const internalValue = ref<string | undefined>(props.defaultValue)

watch(
  () => props.value,
  (next) => {
    if (next === undefined) return
    internalValue.value = next
  }
)

const currentValue = computed(() => (isControlled.value ? props.value : internalValue.value))
const isGroupDisabled = computed(() => props.disabled)

provide(radioGroupContextKey, {
  name: groupName,
  value: currentValue,
  disabled: isGroupDisabled
})

const classes = computed(() => buildRadioGroupClasses(props))

const filteredAttrs = computed(() => {
  const next: Record<string, unknown> = { ...attrs }
  delete next.onChange
  delete next.onInput
  return next
})

const handleChange = (e: Event) => {
  const target = e.target instanceof HTMLInputElement ? e.target : null
  if (!target) return
  if (target.type !== 'radio') return

  const nextValue = target.value

  if (!isControlled.value) internalValue.value = nextValue
  props.onValueChange?.(nextValue)
  emit('value-change', nextValue)
  emit('update:value', nextValue)
}
</script>

<template>
  <div
    role="radiogroup"
    :class="classes"
    :aria-disabled="props.disabled ? 'true' : undefined"
    @change="handleChange"
    v-bind="filteredAttrs"
  >
    <slot />
  </div>
</template>
