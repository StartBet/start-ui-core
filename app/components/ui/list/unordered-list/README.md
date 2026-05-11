# StUnorderedList

Lista não ordenada (`<ul>`) do design system com suporte a:

- orientação `vertical` (default) e `horizontal`
- modo `dense` (remove gap)
- níveis aninhados via contexto interno (sub-listas sempre renderizam em orientação vertical, mas herdam a `navOrientation` para o comportamento de submenu do `StListItem`)

Implementação: [StUnorderedList.vue](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/list/unordered-list/StUnorderedList.vue)

## Import

```ts
import { StUnorderedList } from '~/components/ui/list'
```

## Props

Tipagem: [List.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/types/List.ts)

- `orientation?: 'vertical' | 'horizontal'` (default: `vertical`)
- `dense?: boolean` (default: `false`)
- `className?: string`

## Uso

```vue
<template>
  <StUnorderedList>
    <StListItem clickable>Item A</StListItem>
    <StListItem clickable>Item B</StListItem>
  </StUnorderedList>
</template>
```

```vue
<template>
  <StUnorderedList orientation="horizontal">
    <StListItem clickable>Home</StListItem>
    <StListItem clickable>
      Mais
      <StUnorderedList>
        <StListItem clickable>Sub 1</StListItem>
        <StListItem clickable>Sub 2</StListItem>
      </StUnorderedList>
    </StListItem>
  </StUnorderedList>
</template>
```

