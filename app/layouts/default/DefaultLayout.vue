<script setup lang="ts">
import StHeader from '~/components/domain/header/StHeader.vue';
import StNavbar from '~/components/domain/navbar/StNavbar.vue';
import {
  defaultLayoutMainClass,
  defaultLayoutRootClass,
  defaultLayoutShellClass
} from '~/layouts/default/styleDefaultLayout';
</script>

<template>
  <div :class="defaultLayoutRootClass">
    <StHeader />
    <div :class="defaultLayoutShellClass">
      <StNavbar />
      <main :class="defaultLayoutMainClass">
        <slot />
      </main>
    </div>
  </div>
</template>
