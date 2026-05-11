<script setup lang="ts">
import { computed } from 'vue'
import StBadge from '~/components/ui/badge/StBadge.vue';
import StButton from '~/components/ui/buttom/button/StButton.vue';
import StGrid from '~/components/ui/grid/StGrid.vue';
import StIllustration from '~/components/ui/illustration/StIllustration.vue';
import StListItem from '~/components/ui/list/list-item/StListItem.vue';
import StUnorderedList from '~/components/ui/list/unordered-list/StUnorderedList.vue';
import StPaper from '~/components/ui/paper/StPaper.vue';
import StTooltip from '~/components/ui/tooltip/StTooltip.vue';
import { useThemeService } from '~/services/themeService'
import { useSideNavStore } from '~/stores/sideNavStore'

const route = useRoute()
const sideNav = useSideNavStore()

const items = [
  { label: 'Cassino', to: '/cassino' },
  { label: 'Esportes', to: '/esportes' }
] as const

const { theme } = useThemeService()

const brandIllustrationName = computed(() =>
  theme.value === 'light' ? 'brand/brand-light' : 'brand/brand-dark'
)

const menuAriaLabel = computed(() => (sideNav.isOpen ? 'Fechar menu' : 'Abrir menu'))
const menuVariant = computed(() => (sideNav.isOpen ? 'secondary' : 'primary'))
</script>

<template>
  <header class=" flex items-center justify-between gap-ds-4 z-[200]">
    <StPaper variant="surface-0" width="full" :elevation="0" borderRadius="none" >
      <StGrid cols="2" smCols="2" mdCols="2" gap="4" padding="2">
        <div class="flex items-center justify-start gap-ds-2">
          <StButton
            variant="text"
            :color="menuVariant"
            iconLeft="Bars"
            :aria-label="menuAriaLabel"
            @click="sideNav.toggle"
          />
          <NuxtLink to="/" aria-label="Home">
            <StIllustration :name="brandIllustrationName" alt="Brand" height="3" />
          </NuxtLink>
          <StTooltip placement="bottom">
            <template #trigger>
              <span class="relative inline-flex">
                <StButton variant="text" color="secondary" iconLeft="Gift" aria-label="Promoções" />
                <StBadge variant="negative" pulse className="absolute -right-[-6px] -top-[4px]" />
              </span>
            </template>
            Promoções
          </StTooltip>
          <StUnorderedList orientation="horizontal" dense className="hidden md:flex">
            <StListItem
              v-for="item in items"
              :key="item.to"
              clickable
              size="medium"
              :selected="route.path === item.to"
              :onClick="() => navigateTo(item.to)"
            >
              {{ item.label }}
            </StListItem>
          </StUnorderedList>
        </div>
        <div class="flex items-center justify-end gap-ds-2">
          <StButton variant="outline">Entrar</StButton>
          <StButton variant="solid" color="secondary">
            Cadastrar
          </StButton>
        </div>
      </StGrid>
    </StPaper>
  </header>
</template>
