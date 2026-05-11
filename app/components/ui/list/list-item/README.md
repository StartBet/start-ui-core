# StListItem

Item de lista para compor navegação e listas com suporte a:

- `startAdornment` e `endAdornment` via slots
- estados `selected`, `disabled`, `divider`, `dense`
- modo `clickable` (renderiza um `<button>` interno para interação)
- suporte a sub-listas aninhadas (`StUnorderedList`/`StOrderedList`) com:
  - modo vertical: expande/colapsa
  - modo horizontal: abre submenu via `StDropdown`

Implementação: [StListItem.vue](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/list/list-item/StListItem.vue)

## Import

```ts
import { StListItem } from '~/components/ui/list'
```

## Props

Tipagem: [List.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/types/List.ts)

- `size?: 'small' | 'medium' | 'large'` (default: `medium`)
- `dense?: boolean` (default: `false`)
- `divider?: boolean` (default: `false`)
- `selected?: boolean` (default: `false`)
- `disabled?: boolean` (default: `false`)
- `clickable?: boolean` (default: `false`)
- `className?: string`
- `onClick?: (event: MouseEvent) => void`

## Slots

- `default`: conteúdo do item
- `startAdornment`: conteúdo fixo no início (ícone, avatar, etc.)
- `endAdornment`: conteúdo fixo no fim (badges, ícones, etc.)

## Sub-lista (submenu)

O `StListItem` detecta a primeira ocorrência de `StUnorderedList` ou `StOrderedList` dentro do slot default e trata como sub-lista. O restante dos nós do slot default vira o conteúdo principal do item.

### Vertical (default)

- Renderiza um botão com ícone para expandir/colapsar a sub-lista.

### Horizontal

- Renderiza um `StDropdown` com trigger (ícone) e conteúdo sendo a sub-lista.

## Exemplo

```vue
<template>
  <StUnorderedList>
    <StListItem clickable :onClick="() => console.log('click')">
      <template #startAdornment>•</template>
      Item
      <template #endAdornment>→</template>
    </StListItem>

    <StListItem clickable>
      Item com submenu
      <StUnorderedList>
        <StListItem clickable>Subitem A</StListItem>
        <StListItem clickable>Subitem B</StListItem>
      </StUnorderedList>
    </StListItem>
  </StUnorderedList>
</template>
```
