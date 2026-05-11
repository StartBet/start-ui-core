# StButtonGroup

Componente de agrupamento de botões para Nuxt/Vue que replica a API e as regras internas do `StButtonGroup` do projeto anterior (React + SCSS), mas usando Tailwind e compondo em cima do [StButton](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/buttom/button/StButton.vue).

## Objetivo

- Agrupar múltiplos `StButton` (horizontal ou vertical)
- Controlar seleção (single ou multiple)
- Suportar modo controlado (`value`) e não-controlado (`defaultValue`)
- Aplicar estilo de “grupo” (bordas colapsadas e raio apenas nas extremidades)
- Suportar navegação por teclado (setas) como no componente React

## Arquivos

- Implementação: [StButtonGroup.vue](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/buttom/button-group/StButtonGroup.vue)
- Export barrel: [index.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/buttom/button-group/index.ts)
- Builders/Helpers: [buttonGroup.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/utils/buttonGroup.ts)
- Tipos: [StButtonGroup.interface.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/buttom/button-group/StButtonGroup.interface.ts)
- Dependência: [StButton.vue](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/buttom/button/StButton.vue)

## Como usar

### Exemplo básico (single)

```vue
<template>
  <StButtonGroup>
    <StButton value="a">A</StButton>
    <StButton value="b">B</StButton>
    <StButton value="c">C</StButton>
  </StButtonGroup>
</template>
```

### Exemplo controlado (v-model:value)

O componente emite `update:value`, então pode ser usado com `v-model:value`.

```vue
<script setup lang="ts">
import type { StButtonGroupValue } from '~/components/ui/buttom/button-group/StButtonGroup.interface'

const value = ref<StButtonGroupValue>('b')
</script>

<template>
  <StButtonGroup v-model:value="value">
    <StButton value="a">A</StButton>
    <StButton value="b">B</StButton>
    <StButton value="c">C</StButton>
  </StButtonGroup>
</template>
```

### Multiple (checkbox style)

```vue
<script setup lang="ts">
import type { StButtonGroupValue } from '~/components/ui/buttom/button-group/StButtonGroup.interface'

const value = ref<StButtonGroupValue>(['a'])
</script>

<template>
  <StButtonGroup v-model:value="value" multiple>
    <StButton value="a">A</StButton>
    <StButton value="b">B</StButton>
    <StButton value="c">C</StButton>
  </StButtonGroup>
</template>
```

### Orientação vertical

```vue
<template>
  <StButtonGroup orientation="vertical">
    <StButton value="a">A</StButton>
    <StButton value="b">B</StButton>
    <StButton value="c">C</StButton>
  </StButtonGroup>
</template>
```

## Props (API)

- `value?: StButtonGroupValue`
  - `string | string[]`
- `defaultValue?: StButtonGroupValue`
- `onValueChange?: (value: StButtonGroupValue) => void`
- `multiple?: boolean` (default: `false`)
- `orientation?: StButtonGroupOrientation` (default: `horizontal`)
  - `horizontal | vertical`
- `variant?: ButtonVariant` (default: `solid`)
- `size?: ButtonSize` (default: `medium`)
- `color?: ButtonColor` (default: `primary`)
- `disabled?: boolean` (default: `false`)
- `className?: string` (default: `''`)

Observação:

- O componente faz `v-bind="$attrs"` no container, então aceita `id`, `data-*`, etc.

## Regras internas (equivalentes ao React)

### Normalização do value

Implementado em [normalizeButtonGroupValue](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/utils/buttonGroup.ts#L3-L12):

- `value` ausente → `[]`
- `multiple=true` → sempre vira `string[]`
- `multiple=false` → sempre vira `[string]`

### Estilo do botão ativo

No projeto anterior:

- `primary/secondary`: botão ativo troca para a cor oposta e mantém o `variant`
- `positive/negative`: botão ativo mantém cor e inverte o `variant` (`solid <-> outline`)

Isso foi mantido em [computeActiveProps](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/utils/buttonGroup.ts#L15-L33).

### Keyboard navigation

- Horizontal: `ArrowLeft` / `ArrowRight`
- Vertical: `ArrowUp` / `ArrowDown`

O foco roda ciclicamente pelos botões do grupo (mesma regra do componente React).

### Raio e colapso de bordas

Para simular o SCSS do projeto anterior:

- Cada item recebe `rounded-none`
- Itens subsequentes recebem `-ml-px` (horizontal) ou `-mt-px` (vertical)
- O primeiro e o último item recebem raio apenas nas extremidades (`rounded-l-*`, `rounded-r-*`, `rounded-t-*`, `rounded-b-*`)

## Testes

Os testes ficam em:

- [StButtonGroup.test.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/tests/components/StButtonGroup.test.ts)
