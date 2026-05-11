# StGrid

Componente de grid para Nuxt/Vue que replica a API do `StGrid` do projeto anterior (React + SCSS), mas usando Tailwind e os tokens de spacing do projeto (`ds-*` no `tailwind.config.ts`).

## Objetivo

- Renderizar um container `display: grid`
- Controlar colunas, gaps e espaçamentos (padding/margin) por props
- Suportar breakpoints `sm`, `md`, `lg`
- Gerar classes de forma previsível, porém sem depender de SCSS modules

## Arquivos

- Implementação: [StGrid.vue](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/grid/StGrid.vue)
- Export barrel: [index.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/grid/index.ts)
- Builder de classes: [buildGridClasses](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/utils/grid.ts)
- Parser de shorthand de espaçamento: [spacingShorthandToClasses](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/utils/spacingShorthand.ts)
- Tipos: [Grid.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/types/Grid.ts)

## Como usar

### Exemplo básico

```vue
<template>
  <StGrid cols="2" gap="4">
    <div class="bg-surface-0 p-ds-4">A</div>
    <div class="bg-surface-0 p-ds-4">B</div>
  </StGrid>
</template>
```

Classes geradas (exemplo):

- `grid`
- `grid-cols-2`
- `gap-ds-4`

### Gaps por eixo

```vue
<template>
  <StGrid cols="3" gapX="4" gapY="2">
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </StGrid>
</template>
```

Classes geradas (exemplo):

- `grid-cols-3`
- `gap-x-ds-4`
- `gap-y-ds-2`

### Colunas responsivas

```vue
<template>
  <StGrid cols="1" smCols="2" mdCols="3" lgCols="4" gap="4">
    <div v-for="i in 8" :key="i">{{ i }}</div>
  </StGrid>
</template>
```

Classes geradas (exemplo):

- `grid-cols-1`
- `sm:grid-cols-2`
- `md:grid-cols-3`
- `lg:grid-cols-4`

### Padding/Margin (shorthand estilo CSS)

As props `padding`/`margin` aceitam shorthand parecido com CSS:

- `1 valor`: aplica em todos os lados
- `2 valores`: `vertical horizontal`
- `3 valores`: `top horizontal bottom`
- `4 valores`: `top right bottom left`

Os valores são convertidos para tokens:

- `1..12` vira `ds-1..ds-12` (ex.: `p-ds-4`)
- `0` vira `0` (ex.: `p-0`)
- `auto` fica `auto` (apenas para margin: `m-auto`, `mx-auto` etc.)

Exemplos:

```vue
<template>
  <StGrid cols="2" gap="4" padding="2 4" margin="4 auto">
    <div>Card</div>
    <div>Card</div>
  </StGrid>
</template>
```

Classes geradas (exemplo):

- `py-ds-2 px-ds-4`
- `my-ds-4 mx-auto`

#### Versões responsivas

Use `smPadding`, `mdPadding`, `lgPadding`, `smMargin`, `mdMargin`, `lgMargin`.

```vue
<template>
  <StGrid cols="2" gap="4" smPadding="2" mdPadding="4 6">
    <div>A</div>
    <div>B</div>
  </StGrid>
</template>
```

Classes geradas (exemplo):

- `sm:p-ds-2`
- `md:py-ds-4 md:px-ds-6`

## Props (API)

### Layout

- `cols?: GridSpacing` (default: `1`)
- `smCols?: GridSpacing`
- `mdCols?: GridSpacing`
- `lgCols?: GridSpacing`

### Gaps

- `gap?: GridSpacing`
- `gapX?: GridSpacing`
- `gapY?: GridSpacing`

### Espaçamentos (shorthand)

- `padding?: string`
- `smPadding?: string`
- `mdPadding?: string`
- `lgPadding?: string`
- `margin?: string`
- `smMargin?: string`
- `mdMargin?: string`
- `lgMargin?: string`

### Classe extra

- `className?: string` (adicionada no final da lista)

## Observações importantes

### Tailwind e classes dinâmicas

Como as classes são montadas em runtime, o Tailwind pode não gerar CSS para elas se não estiverem “visíveis” no build.

Este projeto resolve isso usando `safelist` no [tailwind.config.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/tailwind.config.ts) para:

- `grid-cols-1..12`
- `gap-ds-1..12`, `gap-x-ds-*`, `gap-y-ds-*`
- `p*`/`m*` com `ds-*`, além de `0` e `auto`
- Variantes `sm`, `md`, `lg`

Se você aumentar o range (ex.: permitir `13..24`), atualize o `safelist` também.

### Tokens `ds-*`

O projeto define tokens de spacing no Tailwind como `ds-1..ds-12` (8px..96px). O `StGrid` usa esses tokens por padrão.

## Testes

Os testes do componente ficam em:

- [StGrid.test.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/tests/components/StGrid.test.ts)

Eles validam:

- classes base (`grid`, `grid-cols-*`)
- gaps com `ds-*`
- shorthand de padding/margin
- variantes responsivas
