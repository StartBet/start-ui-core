<script setup lang="ts">
import { computed, onBeforeUnmount, watch } from 'vue';
import type { StModalProps } from './StModal.interface';
import { buildStModalClasses } from './styleStModal';
import StButton from '~/components/ui/buttom/button/StButton.vue';
import StPaper from '~/components/ui/paper/StPaper.vue';

defineOptions({ name: 'StModal' });

const emit = defineEmits<{
  'update:open': [value: boolean];
  close: [];
}>();

const props = withDefaults(defineProps<StModalProps>(), {
  open: false,
  showCloseButton: false,
  closeOnOutsideClick: false,
  variant: 'surface-1',
  border: 'none',
  borderRadius: '1',
  elevation: 2,
  interactive: false,
  className: ''
});

const classes = computed(() => buildStModalClasses());

const close = () => {
  emit('update:open', false);
  emit('close');
};

const handleOverlayClick = () => {
  if (!props.closeOnOutsideClick) return;
  close();
};

const handleKeydown = (event: KeyboardEvent) => {
  if (!props.open) return;
  if (event.key !== 'Escape') return;
  close();
};

watch(
  () => props.open,
  (isOpen) => {
    if (globalThis.window === undefined) return;
    if (isOpen) globalThis.window.addEventListener('keydown', handleKeydown);
    else globalThis.window.removeEventListener('keydown', handleKeydown);
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (globalThis.window === undefined) return;
  globalThis.window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <Teleport to="#modal-root">
    <div
      v-if="props.open"
      data-test="modal-overlay"
      :class="classes.overlay"
      @click.self="handleOverlayClick"
    >
      <StPaper
        :variant="props.variant"
        :border="props.border"
        :borderRadius="props.borderRadius"
        :elevation="props.elevation"
        :interactive="props.interactive"
        :bgImage="props.bgImage"
        :width="props.width"
        :height="props.height"
        :padding="props.padding"
        :paddingSm="props.paddingSm"
        :paddingMd="props.paddingMd"
        :paddingLg="props.paddingLg"
        :margin="props.margin"
        :marginSm="props.marginSm"
        :marginMd="props.marginMd"
        :marginLg="props.marginLg"
        :className="props.className"
        role="dialog"
        aria-modal="true"
      >
        <StButton
          v-if="props.showCloseButton"
          variant="text"
          size="small"
          iconLeft="times"
          aria-label="Fechar modal"
          className="!absolute top-ds-2 right-ds-2"
          @click="close"
        />
        <slot />
      </StPaper>
    </div>
  </Teleport>
</template>
