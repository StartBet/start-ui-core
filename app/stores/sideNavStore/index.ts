import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useBreakpoint } from '~/composables/breakpoint';

export const useSideNavStore = defineStore('side-nav', () => {
  const isOpen = ref(false);
  const isAutoInitialized = ref(false);

  const { isMdUp, isReady } = useBreakpoint();

  if (globalThis.window !== undefined) {
    watch(
      () => isReady.value,
      (ready) => {
        if (!ready) return;
        if (isAutoInitialized.value) return;
        isAutoInitialized.value = false;
        setTimeout(() => {
          isOpen.value = isMdUp.value;
        }, 0);
      },
      { immediate: false }
    );
  }

  const open = () => {
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
  };

  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  return { isOpen, open, close, toggle };
});
