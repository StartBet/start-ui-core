<script setup lang="ts">
import { computed, ref } from 'vue';
import type { StLoginModalProps } from './StLoginModal.interface';
import StModal from '~/components/ui/modal/StModal.vue';
import StInput from '~/components/ui/form/input/StInput.vue';
import StTypography from '~/components/ui/typography/StTypography.vue';
import StButton from '~/components/ui/buttom/button/StButton.vue';
import StIllustration from '~/components/ui/illustration/StIllustration.vue';
import { useThemeService } from '~/services/themeService';

defineOptions({ name: 'StLoginModal' });

const { theme } = useThemeService();

const emit = defineEmits<{
  'update:open': [value: boolean];
}>();

const props = withDefaults(defineProps<StLoginModalProps>(), {
  open: false,
  className: ''
});

const email = ref('');
const password = ref('');

const close = () => {
  emit('update:open', false);
};

const brandIllustrationName = computed(() =>
  theme.value === 'light' ? 'brand/brand-light' : 'brand/brand-dark'
);
</script>

<template>
  <StModal
    :open="props.open"
    showCloseButton
    closeOnOutsideClick
    variant="surface-1"
    borderRadius="2"
    :elevation="4"
    width="64"
    padding="4"
    :className="props.className"
    @update:open="
      (v) => {
        if (!v) close();
      }
    "
  >
    <div class="flex flex-col gap-ds-3">
      <StIllustration
        :name="brandIllustrationName"
        alt="Brand"
        height="3"
        className="transition-all duration-200 ease-in-out hover:drop-shadow-action-hover active:drop-shadow-action-pressed"
      />
      <StInput
        v-model:value="email"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="seuemail@exemplo.com"
      />
      <StInput
        v-model:value="password"
        type="password"
        name="password"
        autoComplete="current-password"
        placeholder="********"
      />
      <StTypography as="p" variant="body-small">Esqueceu a senha?</StTypography>
      <StButton variant="solid" color="secondary" @click="close">
        Entrar
      </StButton>
      <StTypography as="p" variant="body-small">
        Você ainda não possui uma conta? Crie uma agora!
      </StTypography>
    </div>
  </StModal>
</template>
