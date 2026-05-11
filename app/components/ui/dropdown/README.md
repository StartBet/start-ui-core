# StDropdown

Componente de dropdown para Nuxt/Vue que replica as regras internas do `StDropdown` do projeto anterior (React + SCSS), mas usando Tailwind e a arquitetura do projeto atual.

## Objetivo

- Renderizar um dropdown com trigger e painel flutuante
- Suportar `placement` (`auto/top/bottom/left/right`) com cálculo de posição e clamp no viewport
- Suportar `width` com tokens (`SizeValue`), incluindo `full` (igual à largura do trigger)
- Suportar modo controlado (`open`) e não-controlado (`defaultOpen`)
- Fechar ao clicar fora (`closeOnOutsideClick`)

## Arquivos

- Implementação: [StDropdown.vue](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/dropdown/StDropdown.vue)
- Export barrel: [index.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/dropdown/index.ts)
- Helpers (classes/posicionamento): [dropdown.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/utils/dropdown.ts)
- Tipos: [Dropdown.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/types/Dropdown.ts)

## Como usar

### Exemplo básico

```vue
<template>
  <StDropdown>
    <template #trigger> Abrir </template>

    <div class="grid gap-ds-2">
      <div class="text-content-ghost">Conteúdo do painel</div>
      <StButton size="small">Ação</StButton>
    </div>
  </StDropdown>
</template>
```

### Controlado (v-model:open)

O componente emite `update:open`, então pode ser usado com `v-model:open`.

```vue
<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <StDropdown v-model:open="open">
    <template #trigger> Toggle ({{ open }}) </template>
    <div>Panel</div>
  </StDropdown>
</template>
```

### Width

`width` usa o mesmo `SizeValue` do `StPaper`:

- `auto | fit-content | min-content | max-content`
- `1..12` (tokens `ds-*`)
- `16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 96`
- `full` (largura igual ao trigger)

```vue
<template>
  <div class="flex gap-ds-4">
    <StDropdown width="24">
      <template #trigger> w-24 </template>
      <div>Panel</div>
    </StDropdown>

    <StDropdown width="full">
      <template #trigger> full (trigger width) </template>
      <div>Panel</div>
    </StDropdown>
  </div>
</template>
```

### Placement

```vue
<template>
  <div class="flex flex-wrap gap-ds-4">
    <StDropdown placement="bottom">
      <template #trigger> bottom </template>
      <div>Panel</div>
    </StDropdown>

    <StDropdown placement="top">
      <template #trigger> top </template>
      <div>Panel</div>
    </StDropdown>
  </div>
</template>
```

## Slots

- `trigger`: conteúdo do trigger.
- default slot: conteúdo do painel.

## Props (API)

- `placement?: StDropdownPlacement` (default: `auto`)
- `width?: SizeValue` (default: `auto`)
- `offset?: number` (default: `8`)
- `open?: boolean`
- `defaultOpen?: boolean` (default: `false`)
- `onOpenChange?: (open: boolean) => void`
- `closeOnOutsideClick?: boolean` (default: `true`)
- `triggerAsChild?: boolean` (default: `false`)
- `className?: string` (default: `''`)
- `panelClassName?: string` (default: `''`)

## Eventos

- `update:open` (para `v-model:open`)
- `open-change`

## Regras internas

### Posicionamento e clamp

O cálculo replica o React:

- `auto` escolhe `bottom` se tiver espaço, senão `top`
- aplica `offset` a partir do trigger
- clampa a posição dentro do viewport com padding de 8px

Implementação: [calculateDropdownPosition](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/utils/dropdown.ts#L61-L113)

### Reposition

Quando aberto, reposiciona em:

- `resize` da janela
- `scroll` (capturing, incluindo scroll de containers)
- mudanças de tamanho do trigger/painel via `ResizeObserver` (quando disponível)

### Click fora

Quando `closeOnOutsideClick=true`, o dropdown fecha ao clicar fora do trigger e do painel.
