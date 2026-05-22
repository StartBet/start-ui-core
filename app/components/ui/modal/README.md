# StModal

Componente de Modal para Nuxt/Vue que usa `Teleport` para renderizar fora da hierarquia normal da página (em `#modal-root`) e centraliza um `StPaper` no viewport.

## Objetivo

- Controlar abertura/fechamento via prop `open` (default: fechado)
- Renderizar conteúdo via `slot`
- Reutilizar a API do `StPaper` para controlar o “box” central (variant, borda, raio, elevation, width/height, padding/margin, etc.)

## Arquivos

- Implementação: [StModal.vue](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-ui-core/app/components/ui/modal/StModal.vue)
- Tipos: [StModal.interface.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-ui-core/app/components/ui/modal/StModal.interface.ts)
- Styles: [styleStModal.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-ui-core/app/components/ui/modal/styleStModal.ts)
- Testes: [StModal.test.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-ui-core/app/components/ui/modal/StModal.test.ts)
- Export barrel: [index.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-ui-core/app/components/ui/modal/index.ts)

## Como usar

```vue
<script setup lang="ts">
import { ref } from 'vue';
import StModal from '~/components/ui/modal/StModal.vue';
import StTypography from '~/components/ui/typography/StTypography.vue';

const open = ref(false);
</script>

<template>
  <button
    class="px-ds-3 py-ds-2 bg-st-brand-primary-600 rounded-ds-1"
    @click="open = true"
  >
    Abrir modal
  </button>

  <StModal
    :open="open"
    variant="surface-1"
    borderRadius="2"
    :elevation="3"
    width="64"
    padding="4"
  >
    <div class="flex flex-col gap-ds-2">
      <StTypography as="h2" variant="heading-3">Título</StTypography>
      <StTypography as="p" variant="body-medium"
        >Conteúdo do modal.</StTypography
      >
      <button
        class="px-ds-3 py-ds-2 bg-st-brand-secondary-700 rounded-ds-1"
        @click="open = false"
      >
        Fechar
      </button>
    </div>
  </StModal>
</template>
```

## Props (API)

- `open?: boolean` (default: `false`)
- `showCloseButton?: boolean` (default: `false`)
- `closeOnOutsideClick?: boolean` (default: `false`)
- Props do `StPaper` para controlar o box central:
  - `variant`, `border`, `borderRadius`, `elevation`, `interactive`, `bgImage`
  - `width`, `height`
  - `padding`, `paddingSm`, `paddingMd`, `paddingLg`
  - `margin`, `marginSm`, `marginMd`, `marginLg`
  - `className`
