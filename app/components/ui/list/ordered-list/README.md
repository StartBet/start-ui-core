# StOrderedList

Lista ordenada (`<ol>`) do design system com suporte a:

- orientação `vertical` (default) e `horizontal`
- modo `dense` (remove gap)
- níveis aninhados via contexto interno (sub-listas sempre renderizam em orientação vertical, mas herdam a `navOrientation` para o comportamento de submenu do `StListItem`)

Implementação: [StOrderedList.vue](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/list/ordered-list/StOrderedList.vue)

## Import

```ts
import { StOrderedList } from '~/components/ui/list'
```

## Props

Tipagem: [List.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/types/List.ts)

- `orientation?: 'vertical' | 'horizontal'` (default: `vertical`)
- `dense?: boolean` (default: `false`)
- `className?: string`

## Uso

```vue
<template>
  <StOrderedList>
    <StListItem clickable>Item 1</StListItem>
    <StListItem clickable>Item 2</StListItem>
  </StOrderedList>
```

```vue
<template>
  <StOrderedList orientation="horizontal">
    <StListItem clickable>Home</StListItem>
    <StListItem clickable>
      Mais
      <StOrderedList>
        <StListItem clickable>Sub 1</StListItem>
        <StListItem clickable>Sub 2</StListItem>
      </StOrderedList>
    </StListItem>
  </StOrderedList>
</template>
```

