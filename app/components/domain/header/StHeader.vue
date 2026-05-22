<script setup lang="ts">
import { computed } from 'vue';
import StBadge from '~/components/ui/badge/StBadge.vue';
import StButton from '~/components/ui/buttom/button/StButton.vue';
import StGrid from '~/components/ui/grid/StGrid.vue';
import StIllustration from '~/components/ui/illustration/StIllustration.vue';
import StPaper from '~/components/ui/paper/StPaper.vue';
import StTooltip from '~/components/ui/tooltip/StTooltip.vue';
import { useThemeService } from '~/services/themeService';
import { useSideNavStore } from '~/stores/sideNavStore';
import { useModalStore } from '~/stores/modalStore';
import { stHeaderRootClass } from '~/components/domain/header/styleStHeader';

defineOptions({ name: 'StHeader' });

const sideNav = useSideNavStore();

const { theme } = useThemeService();

const brandIllustrationName = computed(() =>
  theme.value === 'light' ? 'brand/brand-light' : 'brand/brand-dark'
);

const menuAriaLabel = computed(() =>
  sideNav.isOpen ? 'Fechar menu' : 'Abrir menu'
);
const menuVariant = computed(() => (sideNav.isOpen ? 'secondary' : 'primary'));
const modal = useModalStore();
</script>

<template>
  <header :class="stHeaderRootClass">
    <StPaper
      variant="surface-0"
      width="full"
      :elevation="0"
      borderRadius="none"
      className="border-b border-border-1"
    >
      <StGrid gap="4" className="grid-cols-[1fr_auto]">
        <div class="flex items-center justify-start p-ds-1 gap-ds-2">
          <StButton
            variant="text"
            :color="menuVariant"
            iconLeft="Bars"
            :aria-label="menuAriaLabel"
            @click="sideNav.toggle"
          />
          <NuxtLink to="/" aria-label="Home">
            <StIllustration
              :name="brandIllustrationName"
              alt="Brand"
              height="3"
              className="transition-all duration-200 ease-in-out hover:drop-shadow-action-hover active:drop-shadow-action-pressed"
            />
          </NuxtLink>
          <StTooltip placement="bottom">
            <template #trigger>
              <span class="relative inline-flex">
                <NuxtLink to="/promocoes" aria-label="Promoções">
                  <StButton
                    variant="text"
                    color="secondary"
                    iconLeft="Gift"
                    aria-label="Promoções"
                  />
                </NuxtLink>
                <StBadge
                  variant="negative"
                  pulse
                  className="absolute -right-[-6px] -top-[4px]"
                />
              </span>
            </template>
            Promoções
          </StTooltip>
        </div>
        <div
          class="flex items-center justify-end gap-ds-2 p-ds-2 bg-surface-2 rounded-tl-ds-2 rounded-bl-ds-2"
        >
          <StButton
            variant="text"
            iconLeft="right-to-bracket"
            className="hidden md:block"
            @click="modal.open('login')"
            >Entrar</StButton
          >
          <StButton
            variant="solid"
            color="secondary"
            iconLeft="user-plus"
            className="hidden md:block"
            >Cadastrar</StButton
          >
          <StButton
            variant="text"
            iconLeft="right-to-bracket"
            aria-label="Entrar"
            size="small"
            className="block md:hidden"
          />
          <StButton
            variant="solid"
            color="secondary"
            iconLeft="user-plus"
            aria-label="Cadastrar"
            size="small"
            className="block md:hidden"
          />
        </div>
      </StGrid>
    </StPaper>
  </header>
</template>
