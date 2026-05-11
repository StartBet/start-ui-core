# StOption

Componente de opção clicável para listas/menus, adaptado do design system de referência (React). Ele renderiza um container focável com comportamento de clique e teclado (Enter/Espaço), suportando estado `selected` e adornos opcionais (start/end).

## Importação

```ts
import StOption from '~/components/ui/form/option/StOption.vue'
// ou
import { StOption } from '~/components/ui/form/option'
```

## Exemplos

### Básico

```vue
<template>
  <div class="grid gap-ds-2 max-w-sm">
    <StOption>Opção A</StOption>
    <StOption selected>Opção selecionada</StOption>
  </div>
</template>
```

### Com value e click

`value` é refletido em `data-value` no elemento raiz (útil para debug/seleção).

```vue
<script setup lang="ts">
const handle = () => console.log('clicked')
</script>

<template>
  <StOption :value="10" :onClick="handle">Option 10</StOption>
  <StOption value="abc" @click="handle">Option abc</StOption>
</template>
```

### Com adornos (start/end)

```vue
<template>
  <div class="grid gap-ds-2 max-w-sm">
    <StOption>
      <template #startAdornment>
        <StIcon name="keyboard" :size="2" aria-label="keyboard" />
      </template>
      Teclado
      <template #endAdornment>
        <StIcon name="chevron-right" :size="2" aria-label="next" />
      </template>
    </StOption>
  </div>
</template>
```

## API

### Props

- `value?: string | number`  
  Atribuído em `data-value` no elemento raiz.
- `selected?: boolean` (default: `false`)  
  Controla estilo de seleção e `aria-pressed`.
- `className?: string` (default: `''`)  
  Classes extras aplicadas no container.
- `onClick?: () => void`  
  Callback chamado ao ativar a opção (click/teclado).

### Slots

- `default`  
  Conteúdo da opção.
- `startAdornment`  
  Renderizado antes do conteúdo.
- `endAdornment`  
  Renderizado depois do conteúdo.

### Eventos

- Não emite eventos. Use a prop `onClick` (ou `@click`, que é convertido para `onClick`).

### Atributos

Qualquer atributo adicional passado no componente é encaminhado para o elemento raiz (`<div>`), por exemplo: `id`, `data-*`, `aria-*`.  
Os handlers `onClick`/`onKeydown` do `$attrs` são filtrados para evitar duplicidade (use `@click` ou `onClick` do componente).
