<script setup lang="ts">
import { computed } from 'vue';
import type {
  StLoadingProps,
  StLoadingSize,
  StLoadingVariant
} from './StLoading.interface';
import { buildStLoadingClasses } from './styleStLoading';
import StIllustration from '~/components/ui/illustration/StIllustration.vue';
import type { StIllustrationName } from '~/components/ui/illustration/StIllustration.interface';
import type { SizeValue } from '~/types/Spacing';

defineOptions({ name: 'StLoading' });

const props = withDefaults(defineProps<StLoadingProps>(), {
  type: 'arrow',
  variant: 'primary',
  size: '8',
  value: 0,
  className: ''
});

const classes = computed(() =>
  buildStLoadingClasses({
    type: props.type,
    variant: props.variant,
    size: props.size,
    className: props.className
  })
);

const illustrationByVariant: Record<StLoadingVariant, StIllustrationName> = {
  primary: 'brand/icon-arrow-1',
  secondary: 'brand/icon-arrow-2',
  tertiary: 'brand/icon-arrow-3'
};

const illustrationName = computed(() => illustrationByVariant[props.variant]);

const illustrationSizeByContainer: Record<StLoadingSize, SizeValue> = {
  '3': '1',
  '4': '1',
  '6': '2',
  '8': '3'
};

const illustrationSize = computed(
  () => illustrationSizeByContainer[props.size]
);

const cyclicalValue = computed(() => {
  const raw = props.value ?? 0;
  if (raw < 0) return 0;
  if (raw > 100) return 100;
  return raw;
});

const cyclicalRadius = 46;
const cyclicalCircumference = 2 * Math.PI * cyclicalRadius;
const cyclicalOffset = computed(
  () => cyclicalCircumference * (1 - cyclicalValue.value / 100)
);
</script>

<template>
  <span :class="classes.content" aria-busy="true" aria-live="polite">
    <StIllustration
      v-if="props.size !== '3' || props.type === 'arrow'"
      :name="illustrationName"
      :alt="`Loading ${props.variant}`"
      :width="illustrationSize"
      :height="illustrationSize"
      :class="classes.arrow"
    />

    <span
      v-if="props.type === 'spinner'"
      :class="classes.spinner"
      aria-hidden="true"
    />

    <svg
      v-else-if="props.type === 'cyclical'"
      :class="classes.cyclical"
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <circle
        cx="50"
        cy="50"
        :r="cyclicalRadius"
        fill="none"
        stroke="var(--brand-primary-100)"
        stroke-width="4"
        stroke-linecap="round"
        :stroke-dasharray="cyclicalCircumference"
        :stroke-dashoffset="cyclicalOffset"
        class="transition-[stroke-dashoffset] duration-200 ease-linear"
      />
    </svg>
  </span>
</template>
