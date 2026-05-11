# StTooltip

Componente de tooltip (Nuxt/Vue) baseado no `StTooltip` do projeto anterior (React + SCSS), mantendo a mesma API e regras internas (controlado/não-controlado, posicionamento fixo, clamp no viewport, e fechamento via Escape).

## Arquivos

- Implementação: [StTooltip.vue](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/tooltip/StTooltip.vue)
- Tipos: [Tooltip.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/types/Tooltip.ts)
- Helpers (classes/posicionamento): [tooltip.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/utils/tooltip.ts)

## Como usar

### Exemplo básico

```vue
<template>
  <StTooltip>
    <template #trigger>
      <span class="underline">Passe o mouse</span>
    </template>
    Conteúdo do tooltip
  </StTooltip>
</template>
```

### Placement e offset

```vue
<template>
  <div class="flex gap-ds-4">
    <StTooltip placement="top">
      <template #trigger><span>Top</span></template>
      Tooltip no topo
    </StTooltip>

    <StTooltip placement="right" :offset="12">
      <template #trigger><span>Right + 12</span></template>
      Tooltip à direita com offset
    </StTooltip>
  </div>
</template>
```

### Controlado (v-model:open)

```vue
<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <StTooltip v-model:open="open">
    <template #trigger>
      <button type="button" class="px-2 py-1 border">Toggle ({{ open }})</button>
    </template>
    Tooltip controlado
  </StTooltip>
</template>
```

## Slots

- `trigger`: conteúdo do trigger (obrigatório).
- default slot: conteúdo do tooltip (obrigatório).

## Props

- `className?: string` (default: `''`)
- `panelClassName?: string` (default: `''`)
- `placement?: 'top' | 'bottom' | 'left' | 'right'` (default: `top`)
- `offset?: number` (default: `8`)
- `open?: boolean`
- `defaultOpen?: boolean` (default: `false`)
- `onOpenChange?: (open: boolean) => void`
- `disabled?: boolean` (default: `false`)
- `triggerProps?: StTooltipTriggerProps` (atributos adicionais para o wrapper do trigger)

## Eventos

- `update:open` (para `v-model:open`)
- `open-change`

## Acessibilidade

- O painel usa `role="tooltip"`.
- O trigger recebe `aria-describedby` apontando para o `id` do painel quando aberto.

## Regras internas

- Posicionamento `fixed` com cálculo baseado no boundingClientRect do trigger/painel.
- Reposition quando aberto em `resize`, `scroll` (capturing) e `ResizeObserver` (quando disponível).
- Clamp no viewport com padding de 8px.
