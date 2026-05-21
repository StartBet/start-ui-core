<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import StHeader from '~/components/domain/header/StHeader.vue';
import StFooter from '~/components/domain/footer/StFooter.vue';
import StNavbar from '~/components/domain/navbar/StNavbar.vue';
import StLoadingScreen from '~/components/domain/loading-screen/StLoadingScreen.vue';
import {
  defaultLayoutMainClass,
  defaultLayoutRootClass,
  defaultLayoutTemplateClass,
  defaultLayoutShellClass
} from '~/layouts/default/styleDefaultLayout';
import { useSideNavStore } from '~/stores/sideNavStore';

const route = useRoute();
const sideNav = useSideNavStore();

const isRouteLoading = ref(false);
let loadingTimer: ReturnType<typeof setTimeout> | undefined;

onBeforeUnmount(() => {
  if (loadingTimer) clearTimeout(loadingTimer);
});

if (globalThis.window !== undefined) {
  watch(
    () => route.fullPath,
    () => {
      sideNav.close();
      isRouteLoading.value = true;
      if (loadingTimer) clearTimeout(loadingTimer);
      loadingTimer = setTimeout(() => {
        isRouteLoading.value = false;
      }, 2000);
    }
  );
}
</script>

<template>
  <div :class="defaultLayoutRootClass">
    <StHeader />
    <div :class="defaultLayoutShellClass">
      <StNavbar />
      <div :class="defaultLayoutTemplateClass">
        <StLoadingScreen
          v-if="isRouteLoading"
          surface="surface-2"
          type="arrow"
          variant="primary"
          text="Carregando..."
        />
        <main v-else :class="defaultLayoutMainClass">
          <slot />
        </main>
        <StFooter v-if="!isRouteLoading" />
      </div>
    </div>
  </div>
</template>
