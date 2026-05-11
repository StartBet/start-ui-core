# StChip

Componente de chip para Nuxt/Vue que replica a API do `StChip` do projeto anterior (React + SCSS), mas usando Tailwind e os tokens semânticos do projeto.

## Objetivo

- Exibir um “chip” com variação semântica (`variant`)
- Permitir modo clicável (`clickable`) com acessibilidade (role/button e teclado)
- Permitir chip com botão de fechar (`closable`) com callback (`onClose`)
- Centralizar regras de classe em função pura (fácil de testar)

## Arquivos

- Implementação: [StChip.vue](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/chip/StChip.vue)
- Export barrel: [index.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/chip/index.ts)
- Builder de classes: [buildChipClasses](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/utils/chip.ts)
- Tipos: [Chip.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/types/Chip.ts)
- Ícone de close: [StIcon](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/icon/StIcon.vue)
- Testes: [StChip.test.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/tests/components/StChip.test.ts)

## Como usar

### Exemplo básico

```vue
<template>
  <StChip>Chip</StChip>
</template>
```

### Variants

```vue
<template>
  <div class="flex flex-wrap gap-ds-2">
    <StChip variant="primary">Primary</StChip>
    <StChip variant="secondary">Secondary</StChip>
    <StChip variant="info">Info</StChip>
    <StChip variant="system">System</StChip>
    <StChip variant="warning">Warning</StChip>
    <StChip variant="positive">Positive</StChip>
    <StChip variant="negative">Negative</StChip>
  </div>
</template>
```

### Clickable

O componente replica a regra do React: só reage a click/teclado quando `clickable=true`.

```vue
<template>
  <StChip clickable @click="() => console.log('click')">Clicável</StChip>
</template>
```

Teclado:

- `Enter` e `Space` disparam o mesmo handler do click

### Closable

```vue
<script setup lang="ts">
const onClose = () => console.log('close')
</script>

<template>
  <StChip closable :onClose="onClose">Fechável</StChip>
</template>
```

## Props (API)

- `variant?: StChipVariant` (default: `primary`)
  - `primary | secondary | info | system | warning | positive | negative`
- `clickable?: boolean` (default: `false`)
- `closable?: boolean` (default: `false`)
- `onClose?: () => void`
- `className?: string` (default: `''`)

Observação:

- O componente faz `v-bind="$attrs"` no container, mas filtra `onClick`/`onKeydown` para manter a regra do `clickable`.

## Regras internas

### Estilo

Classes geradas por [buildChipClasses](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/utils/chip.ts):

- Base:
  - layout: `inline-flex items-center gap-ds-1 h-7 px-ds-1 rounded-ds-1`
  - tipografia: `font-body text-ds-xs font-semibold`
  - borda: `border border-transparent`
- Variants:
  - `bg-content-*` + `border-content-*` + `text-surface-*`
- Clickable:
  - `role="button"`, `tabindex="0"`
  - foco: `focus-visible:ring-2 focus-visible:ring-focus`
  - interação: `hover:opacity-90 active:opacity-80`

### Close

Quando `closable=true`, renderiza um `<button type="button">` com:

- `@click.stop` para não disparar o click do chip
- ícone `times` via `StIcon`
- chama `onClose`
