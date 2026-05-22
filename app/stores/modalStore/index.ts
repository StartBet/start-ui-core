import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export type AppModalName = 'login' | 'register';

export const useModalStore = defineStore('modal', () => {
  const active = ref<AppModalName | null>(null);

  const isOpen = computed(() => active.value !== null);

  const open = (name: AppModalName) => {
    active.value = name;
  };

  const close = () => {
    active.value = null;
  };

  return { active, isOpen, open, close };
});
