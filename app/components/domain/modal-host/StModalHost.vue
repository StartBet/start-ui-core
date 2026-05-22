<script setup lang="ts">
import { useModalStore } from '~/stores/modalStore';
import StLoginModal from '~/components/domain/modals/login/StLoginModal.vue';
import StRegisterModal from '~/components/domain/modals/register/StRegisterModal.vue';

defineOptions({ name: 'StModalHost' });

const modal = useModalStore();
</script>

<template>
  <StLoginModal
    v-if="modal.active === 'login'"
    :open="true"
    @update:open="
      (v) => {
        if (!v) modal.close();
      }
    "
  />
  <StRegisterModal
    v-else-if="modal.active === 'register'"
    :open="true"
    @update:open="
      (v) => {
        if (!v) modal.close();
      }
    "
  />
</template>
