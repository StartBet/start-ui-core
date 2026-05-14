<script setup lang="ts">
import { computed } from 'vue';
import type { StCardGameProps } from './StCardGame.interface';
import { buildStCardGameClasses, providerLabel } from './styleStCardGame';
import StPaper from '~/components/ui/paper/StPaper.vue';
import StImage from '~/components/ui/image/StImage.vue';
import StTypography from '~/components/ui/typography/StTypography.vue';
import StButton from '~/components/ui/buttom/button/StButton.vue';

defineOptions({ name: 'StCardGame' });

const props = withDefaults(defineProps<StCardGameProps>(), {
  variant: 'surface-1'
});

const classes = buildStCardGameClasses(props.variant);

const providerName = computed(
  () => providerLabel[props.provider] ?? props.provider
);
</script>

<template>
  <div :class="classes.root">
    <StPaper
      padding="0"
      border="none"
      borderRadius="2"
      :elevation="0"
      width="full"
      height="32"
      :className="classes.paper"
    >
      <StImage
        :src="props.image"
        :alt="props.name"
        :className="classes.image"
        width="full"
        height="full"
      />
      <StPaper
        :variant="props.variant"
        padding="0 2 2"
        border="none"
        borderRadius="none"
        :elevation="0"
        width="full"
        :className="classes.content"
      >
        <StTypography
          as="h3"
          variant="body-medium"
          weight="semibold"
          class="text-content"
          :className="classes.title"
          >{{ props.name }}</StTypography
        >
        <StTypography
          as="p"
          variant="body-medium"
          :className="classes.provider"
          >{{ providerName }}</StTypography
        >
      </StPaper>
      <div :class="classes.buttonAct">
        <StButton color="secondary">Jogar</StButton>
      </div>
    </StPaper>
  </div>
</template>
