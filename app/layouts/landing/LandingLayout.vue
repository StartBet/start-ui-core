<script setup lang="ts">
import { landingLayoutRootClass } from './styleLandingLayout';

defineOptions({ name: 'LandingLayout' });
</script>

<template>
  <div :class="landingLayoutRootClass">
    <slot />
  </div>
</template>
