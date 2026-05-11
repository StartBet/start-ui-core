# StPaper

Componente de “Paper” (container) para Nuxt/Vue que replica a API do `StPaper` do projeto anterior (React + SCSS), mas usando Tailwind e os tokens do projeto (cores semânticas `surface-*`, borders `border-*`, spacing `ds-*`, etc.).

## Objetivo

- Renderizar um container para “superfície” com variações de background (`variant`)
- Controlar borda (`border`), raio (`borderRadius`) e sombra (`elevation`)
- Suportar comportamento interativo (hover/active) via `interactive`
- Controlar `width`/`height` por tokens
- Aplicar `padding`/`margin` via shorthand estilo CSS, incluindo responsivo (`sm/md/lg`)

## Arquivos

- Implementação: [StPaper.vue](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/paper/StPaper.vue)
- Export barrel: [index.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/paper/index.ts)
- Builder de classes: [buildPaperClasses](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/utils/paper.ts)
- Parser de shorthand de espaçamento: [spacingShorthandToClasses](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/utils/spacingShorthand.ts)
- Tipos: [Paper.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/types/Paper.ts)
- Tailwind tokens do Paper (`shadow-paper-*`, `rounded-ds-*`): [tailwind.config.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/tailwind.config.ts)

## Como usar

### Exemplo básico

```vue
<template>
  <StPaper padding="4" borderRadius="2" elevation="1">
    <h2 class="font-heading text-heading-4 text-content-primary">Título</h2>
    <p class="mt-2 text-content-ghost">Conteúdo</p>
  </StPaper>
</template>
```

Classes geradas (exemplo):

- `relative block transition-all duration-200 ease-in-out`
- `bg-surface-1`
- `border-0`
- `rounded-ds-2`
- `shadow-paper-1`
- `p-ds-4`

### Trocar a tag com `as`

No projeto anterior, o Paper suportava `as` com `ElementType`. Aqui, a adaptação usa `as?: string` e renderiza via `<component :is="as">`.

```vue
<template>
  <StPaper as="section" padding="4"> Conteúdo dentro de uma section </StPaper>
</template>
```

## Props (API)

### Aparência (background)

- `variant?: PaperVariant` (default: `surface-1`)

Valores disponíveis:

- `surface-0` | `surface-1` | `surface-2` | `surface-3` | `surface-4`
- `surface-info` | `surface-system` | `surface-warning` | `surface-positive` | `surface-negative`
- `surface-primary`

Mapeamento no Tailwind: `variant` vira `bg-surface-*` via [paper.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/utils/paper.ts#L11-L23).

### Borda

- `border?: PaperBorder` (default: `none`)

Valores disponíveis:

- `none` | `1` | `2` | `3`
- `primary` | `secondary` | `info` | `system` | `warning` | `positive` | `negative`

Mapeamento no Tailwind (exemplos):

- `border="2"` → `border border-border-2`
- `border="primary"` → `border border-primary`
- `border="warning"` → `border border-content-warning`

### Border radius

- `borderRadius?: PaperBorderRadius` (default: `1`)

Valores disponíveis:

- `none` | `1` | `2`

Mapeamento no Tailwind:

- `borderRadius="1"` → `rounded-ds-1`
- `borderRadius="2"` → `rounded-ds-2`
- `borderRadius="none"` → `rounded-none`

Os tokens `rounded-ds-1`/`rounded-ds-2` são definidos em [tailwind.config.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/tailwind.config.ts).

### Elevation (sombra)

- `elevation?: PaperElevation` (default: `1`)

Valores disponíveis:

- `0 | 1 | 2 | 3 | 4`

Mapeamento no Tailwind:

- `0` → `shadow-paper-0`
- `1` → `shadow-paper-1`
- `2` → `shadow-paper-2`
- `3` → `shadow-paper-3`
- `4` → `shadow-paper-4`

As sombras `shadow-paper-*` replicam o comportamento do SCSS antigo e usam os tokens `--color-shadow-*` definidos em [tailwind.css](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/assets/css/tailwind.css).

### Interativo

- `interactive?: boolean` (default: `false`)

Quando `interactive` está ativo:

- adiciona `cursor-pointer`
- adiciona `active:translate-y-px`
- aplica hover de sombra (se `elevation !== 4`), seguindo a regra do componente antigo:
  - `elevation=0` → `hover:shadow-paper-1`
  - `elevation=1` → `hover:shadow-paper-2`
  - `elevation=2` → `hover:shadow-paper-3`
  - `elevation=3` → `hover:shadow-paper-4`

### Width / Height

- `width?: SizeValue`
- `height?: SizeValue`

Valores disponíveis incluem:

- `auto`, `full`, `fit-content`, `min-content`, `max-content`
- tokens numéricos: `1..12`, `16`, `20`, `24`, `32`, `40`, `48`, `56`, `64`, `72`, `80`, `96`

Mapeamento no Tailwind:

- `width="2"` → `w-ds-2`
- `height="2"` → `h-ds-2`
- `width="16"` → `w-16`
- `height="full"` → `h-full`
- `width="fit-content"` → `w-fit`

Esse mapeamento está centralizado em [paper.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/utils/paper.ts).

### Padding / Margin (shorthand estilo CSS)

- `padding?: string`
- `paddingSm?: string`
- `paddingMd?: string`
- `paddingLg?: string`
- `margin?: string`
- `marginSm?: string`
- `marginMd?: string`
- `marginLg?: string`

O shorthand segue o padrão CSS:

- `1 valor`: aplica em todos os lados
- `2 valores`: `vertical horizontal`
- `3 valores`: `top horizontal bottom`
- `4 valores`: `top right bottom left`

Os valores são convertidos para tokens:

- `1..12` vira `ds-1..ds-12` (ex.: `p-ds-4`)
- `0` vira `0` (ex.: `p-0`)
- `auto` fica `auto` (somente em margin: `m-auto`, `mx-auto`, etc.)

Exemplo:

```vue
<template>
  <StPaper padding="2 4" margin="4 auto"> Conteúdo </StPaper>
</template>
```

Classes geradas (exemplo):

- `py-ds-2 px-ds-4`
- `my-ds-4 mx-auto`

Versões responsivas:

```vue
<template>
  <StPaper padding="2" paddingMd="4 6"> Conteúdo </StPaper>
</template>
```

Classes geradas (exemplo):

- `p-ds-2`
- `md:py-ds-4 md:px-ds-6`

### Classe extra

- `className?: string` (adicionada no final da lista)

## Observações importantes

### Tailwind e geração de CSS

Diferente do `StGrid`, o `StPaper` monta classes a partir de tabelas/mapeamentos que já contêm as strings de classes do Tailwind, então o Tailwind tende a gerar o CSS normalmente.

Se você introduzir novas variações que gerem classes dinamicamente (ex.: concatenando strings com valores), pode ser necessário adicionar `safelist` no [tailwind.config.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/tailwind.config.ts).

## Testes

Os testes do componente ficam em:

- [StPaper.test.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/tests/components/StPaper.test.ts)

Eles validam:

- defaults (variant/border/radius/elevation)
- variações de `variant`, `border`, `elevation`, `borderRadius`
- comportamento `interactive` (hover/active)
- width/height + spacing shorthand
- renderização com `as`
