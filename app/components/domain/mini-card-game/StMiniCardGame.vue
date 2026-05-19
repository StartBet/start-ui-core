<script setup lang="ts">
import { computed } from 'vue';
import type { StMiniCardGameProps } from './StMiniCardGame.interface';
import {
  buildStMiniCardGameClasses,
  providerLabel
} from './styleStMiniCardGame';
import StPaper from '~/components/ui/paper/StPaper.vue';
import StImage from '~/components/ui/image/StImage.vue';
import StTypography from '~/components/ui/typography/StTypography.vue';

defineOptions({ name: 'StMiniCardGame' });

const props = withDefaults(defineProps<StMiniCardGameProps>(), {
  image: undefined,
  latestEarnings: undefined,
  lastEarnings: undefined,
  className: ''
});

const classes = computed(() => buildStMiniCardGameClasses(props.className));

const providerName = computed(
  () => providerLabel[props.provider] ?? props.provider
);

const earningsValue = computed(
  () => props.lastEarnings ?? props.latestEarnings
);

const formatBRL = (value: number) => {
  const fixed = value.toFixed(2);
  const [intPart, decPart] = fixed.split('.');
  const intFormatted = (intPart ?? '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `R$ ${intFormatted},${decPart ?? '00'}`;
};

const earningsLabel = computed(() => {
  const value = earningsValue.value;
  if (value === undefined) return undefined;
  return formatBRL(value);
});
</script>

<template>
  <StPaper
    variant="surface-0"
    border="none"
    borderRadius="2"
    :elevation="0"
    padding="1"
    :className="classes.root"
  >
    <StImage
      v-if="props.image"
      :src="props.image"
      :alt="props.name"
      :className="classes.image"
      width="6"
      height="full"
    />
    <div v-else :class="classes.imageFallback" />

    <div :class="classes.content">
      <StTypography
        as="h3"
        :size="1"
        weight="semibold"
        :className="classes.name"
      >
        {{ props.name }}
      </StTypography>
      <StTypography as="p" :size="1" :className="classes.provider">
        {{ providerName }}
      </StTypography>
      <StTypography
        v-if="earningsLabel"
        as="p"
        :size="2"
        weight="extrabold"
        :className="classes.earnings"
      >
        {{ earningsLabel }}
      </StTypography>
    </div>
  </StPaper>
</template>
