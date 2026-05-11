<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <section class="rounded-2xl bg-surface-0 p-6 shadow">
    <h1 v-if="title" class="font-heading text-heading-4 text-content-primary">
      {{ title }}
    </h1>
    <div :class="title ? 'mt-2' : ''">
      <slot />
    </div>
  </section>
</template>
