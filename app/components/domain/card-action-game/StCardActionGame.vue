<script setup lang="ts">
import type { StCardActionGameProps } from './StCardActionGame.interface';
import { buildStCardActionGameClasses } from './styleStCardActionGame';

defineProps<StCardActionGameProps>();

const classes = buildStCardActionGameClasses();
</script>

<template>
  <div :class="classes.root">
    <StPaper
      variant="surface-1"
      padding="2"
      border="1"
      borderRadius="2"
      :elevation="3"
      width="full"
      height="32"
      :className="classes.paperJoin"
    >
      <StIllustration
        v-if="illustration"
        :name="illustration"
        alt="Ilustração do jogo"
        height="32"
        :className="classes.illustration"
      />
      <StTypography
        as="h1"
        variant="hero-title"
        :lines="2"
        :size="8"
        weight="bold"
        lineHeight="tight"
        :className="classes.title"
        >{{ title || '' }}</StTypography
      >
      <StTypography
        as="p"
        variant="body-medium"
        :className="classes.subtitle"
        >{{ subtitle || '' }}</StTypography
      >
      <StButton
        variant="solid"
        color="secondary"
        :to="to || ''"
        :target="target || ''"
        :className="classes.button"
        fullWidth
      >
        {{ buttonText || '' }}
        <template #endAdornment>
          <StIllustration
            name="brand/icon-button-1"
            alt="Button Right"
            height="3"
            :className="classes.buttonEndIcon"
          />
        </template>
      </StButton>
    </StPaper>
  </div>
</template>
