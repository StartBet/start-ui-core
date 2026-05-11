<script setup lang="ts">
import StIllustration from '~/components/ui/illustration/StIllustration.vue'
import type { AppCardActionGameClassProps } from './AppCardActionGame.interface'
import { buildAppCardActionGameClasses } from './styleAppCardActionGame'

const props = withDefaults(defineProps<AppCardActionGameClassProps>(), {
    title: '',
    subtitle: '',
    buttonText: '',
    to: '',
    target: '',
    illustration: 'stickers-game/sticker-aviator'
})

const classes = buildAppCardActionGameClasses()
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
      <StIllustration :name="illustration" alt="Ilustração do jogo" height="32" :className="classes.illustration" />
      <StTypography as="h1" variant="heading-4" :className="classes.title">{{ title }}</StTypography>
      <StTypography as="p" variant="body-medium" :className="classes.subtitle">{{ subtitle }}</StTypography>
      <StButton variant="solid" color="secondary" :to="to" :target="target" :className="classes.button" fullWidth>
        {{ buttonText }}
        <template #endAdornment>
          <StIllustration name="brand/icon-button-1" alt="Button Right" height="3" :className="classes.buttonEndIcon" />
        </template>
      </StButton>
    </StPaper>
  </div>
</template>
