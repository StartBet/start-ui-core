<script setup lang="ts">
import { computed } from 'vue';
import type { StLoadingScreenProps } from './StLoadingScreen.interface';
import { buildStLoadingScreenClasses } from './styleStLoadingScreen';
import StLoading from '~/components/ui/loading/StLoading.vue';
import StPaper from '~/components/ui/paper/StPaper.vue';
import StTypography from '~/components/ui/typography/StTypography.vue';

defineOptions({ name: 'StLoadingScreen' });

const props = withDefaults(defineProps<StLoadingScreenProps>(), {
  surface: 'surface-1',
  type: undefined,
  variant: undefined,
  value: undefined,
  text: undefined,
  className: ''
});

const classes = computed(() => buildStLoadingScreenClasses(props.className));
</script>

<template>
  <StPaper
    :variant="props.surface"
    border="none"
    borderRadius="none"
    :elevation="0"
    width="full"
    height="full"
    :className="classes.root"
  >
    <StLoading
      :type="props.type"
      :variant="props.variant"
      :value="props.value"
      size="8"
    />
    <StTypography
      v-if="props.text"
      as="p"
      variant="body-medium"
      :className="classes.text"
    >
      {{ props.text }}
    </StTypography>
  </StPaper>
</template>
