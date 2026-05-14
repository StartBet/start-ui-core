<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue';
import StIcon from '~/components/ui/icon/StIcon.vue';
import type { StSwitchProps } from '~/components/ui/form/switch/StSwitch.interface';
import { buildSwitchClasses } from '~/components/ui/form/switch/styleStSwitch';

defineOptions({ name: 'StSwitch', inheritAttrs: false });

const props = withDefaults(defineProps<StSwitchProps>(), {
  checked: undefined,
  defaultChecked: undefined,
  disabled: false,
  label: undefined,
  iconOff: undefined,
  iconOn: undefined,
  className: ''
});

const emit = defineEmits<{
  'update:checked': [value: boolean];
  change: [event: Event];
}>();

const attrs = useAttrs();
const slots = useSlots();

const isControlled = computed(() => props.checked !== undefined);
const internalChecked = ref<boolean>(props.defaultChecked ?? false);

const checkedValue = computed(() =>
  isControlled.value ? (props.checked as boolean) : internalChecked.value
);

const hasLabel = computed(() => {
  const slotNodes = slots.default?.() ?? [];
  const slotHasContent = slotNodes.length > 0;
  const propHasContent =
    props.label !== undefined && String(props.label).length > 0;
  return slotHasContent || propHasContent;
});

const classes = computed(() => buildSwitchClasses(props));

const wrapperClass = computed(() =>
  [classes.value.wrapper, attrs.class].filter(Boolean).join(' ')
);
const wrapperStyle = computed(() => attrs.style);

const inputAttrs = computed(() => {
  const next: Record<string, unknown> = { ...attrs };
  delete next.class;
  delete next.style;
  return next;
});

const handleChange = (e: Event) => {
  const target = e.target instanceof HTMLInputElement ? e.target : null;
  const nextChecked = target ? target.checked : !checkedValue.value;

  if (!isControlled.value) internalChecked.value = nextChecked;

  emit('update:checked', nextChecked);
  emit('change', e);
};
</script>

<template>
  <label :class="wrapperClass" :style="wrapperStyle">
    <input
      :class="classes.input"
      type="checkbox"
      role="switch"
      :disabled="props.disabled"
      :checked="checkedValue"
      @change="handleChange"
      v-bind="inputAttrs"
      :aria-checked="checkedValue ? 'true' : 'false'"
    />
    <span :class="classes.track" aria-hidden="true">
      <span
        v-if="props.iconOff"
        :class="classes.iconOff"
        aria-hidden="true"
        data-switch-icon-off
      >
        <StIcon :name="props.iconOff" :size="2" aria-hidden="true" />
      </span>
      <span
        v-if="props.iconOn"
        :class="classes.iconOn"
        aria-hidden="true"
        data-switch-icon-on
      >
        <StIcon :name="props.iconOn" :size="2" aria-hidden="true" />
      </span>
      <span :class="classes.thumb" data-switch-thumb />
    </span>
    <span v-if="hasLabel" :class="classes.label">
      <slot>{{ props.label }}</slot>
    </span>
  </label>
</template>
