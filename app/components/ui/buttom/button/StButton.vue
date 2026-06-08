<script setup lang="ts">
import { computed, useSlots } from 'vue';
import StIcon from '~/components/ui/icon/StIcon.vue';
import type {
  ButtonColor,
  ButtonSize,
  ButtonVariant
} from '~/components/ui/buttom/button/StButton.interface';
import { buildButtonClasses } from '~/components/ui/buttom/button/styleStButton';

const slots = useSlots();

defineSlots<{
  startAdornment?: () => unknown;
  default?: () => unknown;
  endAdornment?: () => unknown;
}>();

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    size?: ButtonSize;
    color?: ButtonColor;
    fullWidth?: boolean;
    type?: 'button' | 'submit' | 'reset';
    value?: string | number;
    iconLeft?: string;
    iconRight?: string;
    disabled?: boolean;
    className?: string;
  }>(),
  {
    variant: 'solid',
    size: 'medium',
    color: 'primary',
    fullWidth: false,
    type: 'button',
    disabled: false,
    className: ''
  }
);

const hasSlotContent = (slot?: (() => unknown) | undefined) => {
  const nodes = (slot?.() as any[]) ?? [];
  return nodes.some((node) => {
    const children = node?.children;
    if (typeof children === 'string') return children.trim().length > 0;
    return true;
  });
};

const hasDefaultSlot = computed(() => hasSlotContent(slots.default));
const hasStartAdornment = computed(() => hasSlotContent(slots.startAdornment));
const hasEndAdornment = computed(() => hasSlotContent(slots.endAdornment));

const adornmentCount = computed(() => {
  return (
    Number(hasStartAdornment.value) +
    Number(Boolean(props.iconLeft)) +
    Number(hasEndAdornment.value) +
    Number(Boolean(props.iconRight))
  );
});

const isIconOnly = computed(
  () => !hasDefaultSlot.value && adornmentCount.value === 1
);

const iconSize = computed(() => (props.size === 'large' ? 5 : 4));

const iconLeftAriaLabel = computed(() =>
  isIconOnly.value ? 'icon' : 'icon-left'
);
const iconRightAriaLabel = computed(() =>
  isIconOnly.value ? 'icon' : 'icon-right'
);

const classes = computed(() =>
  buildButtonClasses({ ...props, isIconOnly: isIconOnly.value })
);
</script>

<template>
  <button
    :type="props.type"
    :value="props.value"
    :disabled="props.disabled"
    :class="[classes.container, 'focus:outline-none']"
    v-bind="$attrs"
  >
    <span v-if="hasStartAdornment" class="ml-2 inline-flex">
      <slot name="startAdornment" />
    </span>
    <span :class="classes.content">
      <StIcon
        v-if="props.iconLeft"
        :name="props.iconLeft"
        :size="iconSize"
        :aria-label="iconLeftAriaLabel"
      />

      <slot v-if="hasDefaultSlot" />

      <StIcon
        v-if="props.iconRight"
        :name="props.iconRight"
        :size="iconSize"
        :aria-label="iconRightAriaLabel"
      />
    </span>
    <span v-if="hasEndAdornment" class="mr-2 inline-flex">
      <slot name="endAdornment" />
    </span>
  </button>
</template>
