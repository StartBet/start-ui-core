# StTypography

Componente de tipografia para Nuxt/Vue que replica a API do `StTypography` do projeto anterior (React + SCSS), mas usando Tailwind e os tokens tipográficos já definidos no projeto (`font-*`, `text-*`, `leading-*`, `tracking-*`).

## Objetivo

- Renderizar texto com presets (variants) equivalentes ao design system anterior
- Permitir overrides de tamanho (`size`), peso (`weight`), família (`family`), line-height e letter-spacing
- Suportar alinhamento, estilos (italic/underline/strikethrough), transformações (uppercase/lowercase/capitalize) e truncamento
- Suportar clamp por número máximo de linhas (`maxLines`)

## Arquivos

- Implementação: [StTypography.vue](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/typography/StTypography.vue)
- Export barrel: [index.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/typography/index.ts)
- Builder de classes: [buildTypographyClasses](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/utils/typography.ts)
- Tipos: [Typography.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/types/Typography.ts)
- Tokens Tailwind (fontFamily/fontSize/lineHeight/letterSpacing): [tailwind.config.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/tailwind.config.ts#L296-L343)

## Como usar

### Exemplo básico

```vue
<template>
  <StTypography>Texto padrão (body-medium)</StTypography>
</template>
```

### Trocar a tag com `as`

```vue
<template>
  <StTypography as="h2" variant="heading-3">Título</StTypography>
  <StTypography as="span" variant="body-small">Texto inline</StTypography>
</template>
```

### Variants

As variantes reproduzem os presets do projeto anterior:

- `heading-1 | heading-2 | heading-3 | heading-4`
- `highlight-large | highlight-medium`
- `body-large | body-medium | body-small`

```vue
<template>
  <div class="grid gap-ds-4">
    <StTypography variant="heading-1">Heading 1</StTypography>
    <StTypography variant="heading-2">Heading 2</StTypography>
    <StTypography variant="highlight-large">Highlight large</StTypography>
    <StTypography variant="body-small">Body small</StTypography>
  </div>
</template>
```

## Props (API)

- `variant?: TypographyVariant` (default: `body-medium`)
- `as?: TypographyElement` (default: `p`)
- `size?: FontSize`
  - `1..12` (mapeia para `text-ds-*`/`text-heading-*` via [typography.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/utils/typography.ts))
- `weight?: FontWeight`
  - `light | normal | medium | semibold | bold`
- `family?: FontFamily`
  - `body | heading | highlight | display`
  - `display` é alias para `highlight`
- `lineHeight?: LineHeight`
  - `tight | snug | normal | relaxed | loose` (mapeia para `leading-ds-*`)
- `letterSpacing?: LetterSpacing`
  - `tighter | tight | normal | wide | wider | widest` (mapeia para `tracking-ds-*`)
- `align?: TextAlign`
  - `left | center | right | justify`
- `italic?: boolean` (default: `false`)
- `underline?: boolean` (default: `false`)
- `strikethrough?: boolean` (default: `false`)
- `uppercase?: boolean` (default: `false`)
- `lowercase?: boolean` (default: `false`)
- `capitalize?: boolean` (default: `false`)
- `truncate?: boolean` (default: `false`)
  - Usa `truncate` (ellipsis em 1 linha)
- `maxLines?: number`
  - Aplica clamp de `1..6` linhas (valores fora do range são normalizados para `1` ou `6`)
- `className?: string` (default: `''`)

Observação:

- O componente faz `v-bind="$attrs"` na raiz, então aceita `id`, `data-*`, `aria-*`, etc.

## Classes geradas (regras internas)

As classes são montadas por [buildTypographyClasses](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/utils/typography.ts):

- Base: `m-0 p-0 text-content-default`
- Variant: aplica `font-*` + `text-*` (ex.: `font-heading text-heading-4`)
- Overrides:
  - `size` adiciona um `text-*` após o variant para sobrescrever o tamanho
  - `family` adiciona `font-*` após o variant para sobrescrever a família
  - `weight` adiciona `font-*` para sobrescrever o peso
  - `lineHeight`/`letterSpacing` aplicam `leading-*`/`tracking-*`
- `truncate` aplica 1 linha com ellipsis
- `maxLines` aplica clamp de múltiplas linhas via classes literais (para o Tailwind gerar CSS corretamente)

## Testes

Os testes do componente ficam em:

- [StTypography.test.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/tests/components/StTypography.test.ts)
