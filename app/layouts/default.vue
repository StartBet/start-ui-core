<script setup lang="ts">
import AppHeaderNav from '~/components/domain/header/AppHeaderNav.vue'
import AppSideNav from '~/components/domain/navbar/AppSideNav.vue'
</script>

<template>
  <div class="flex h-screen flex-col overflow-hidden bg-surface-4 text-content-default">
    <AppHeaderNav />
    <div class="flex min-h-0 flex-1 overflow-hidden flex-row relative">
      <AppSideNav />
      <main class="min-h-0 min-w-0 flex-1 overflow-y-auto px-ds-4"> 
        <slot />
      </main>
    </div>
  </div>
</template>