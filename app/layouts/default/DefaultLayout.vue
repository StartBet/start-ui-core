<script setup lang="ts">
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import StHeader from '~/components/domain/header/StHeader.vue';
import StFooter from '~/components/domain/footer/StFooter.vue';
import StNavbar from '~/components/domain/navbar/StNavbar.vue';
import {
  defaultLayoutMainClass,
  defaultLayoutRootClass,
  defaultLayoutShellClass
} from '~/layouts/default/styleDefaultLayout';
import { useSideNavStore } from '~/stores/sideNavStore';

const route = useRoute();
const sideNav = useSideNavStore();

if (globalThis.window !== undefined) {
  watch(
    () => route.fullPath,
    () => {
      sideNav.close();
    }
  );
}
</script>

<template>
  <div :class="defaultLayoutRootClass">
    <StHeader />
    <div :class="defaultLayoutShellClass">
      <StNavbar />
      <main :class="defaultLayoutMainClass">
        <slot />
        <StFooter />
      </main>
    </div>
  </div>
</template>
