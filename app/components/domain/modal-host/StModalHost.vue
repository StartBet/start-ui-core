<script setup lang="ts">
import { computed } from 'vue';
import { useModalStore } from '~/stores/modalStore';
import StLoginModal from '~/components/domain/modals/login/StLoginModal.vue';

defineOptions({ name: 'StModalHost' });

const modal = useModalStore();

const isLoginOpen = computed(() => modal.active === 'login');

const setLoginOpen = (value: boolean) => {
  if (value) modal.open('login');
  else modal.close();
};
</script>

<template>
  <StLoginModal :open="isLoginOpen" @update:open="setLoginOpen" />
</template>
