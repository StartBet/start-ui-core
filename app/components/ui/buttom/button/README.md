# StButton

Componente de botão para Nuxt/Vue que replica a API do `StButton` do projeto anterior (React + SCSS), mas usando Tailwind e os tokens semânticos do projeto (`primary`, `secondary`, `positive`, `negative`, `surface-*`, `content-*`, `border-*`).

## Objetivo

- Padronizar botões com variantes (`solid`, `outline`, `text`)
- Suportar tamanhos (`small`, `medium`, `large`)
- Suportar cores semânticas (`primary`, `secondary`, `positive`, `negative`)
- Suportar modo “icon only” quando não houver conteúdo no slot e existir `iconLeft`/`iconRight`
- Centralizar regras de classe em função pura (fácil de testar)

## Arquivos

- Implementação: [StButton.vue](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/buttom/button/StButton.vue)
- Export barrel: [index.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/buttom/button/index.ts)
- Builder de classes: [buildButtonClasses](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/utils/button.ts)
- Tipos: [Button.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/types/Button.ts)
- Tokens usados (cores, radius e spacing): [tailwind.config.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/tailwind.config.ts)

## Como usar

### Exemplo básico

```vue
<template>
  <StButton>Salvar</StButton>
</template>
```

### Variantes e cores

```vue
<template>
  <div class="flex flex-wrap gap-ds-4">
    <StButton variant="solid" color="primary">Primary</StButton>
    <StButton variant="solid" color="secondary">Secondary</StButton>
    <StButton variant="outline" color="positive">Positive</StButton>
    <StButton variant="text" color="negative">Negative</StButton>
  </div>
</template>
```

### Tamanhos

```vue
<template>
  <div class="flex flex-wrap items-center gap-ds-4">
    <StButton size="small">Small</StButton>
    <StButton size="medium">Medium</StButton>
    <StButton size="large">Large</StButton>
  </div>
</template>
```

### Disabled

```vue
<template>
  <StButton disabled>Desabilitado</StButton>
</template>
```

## Props (API)

- `variant?: ButtonVariant` (default: `solid`)
  - `solid | outline | text`
- `size?: ButtonSize` (default: `medium`)
  - `small | medium | large`
- `color?: ButtonColor` (default: `primary`)
  - `primary | secondary | positive | negative`
- `type?: 'button' | 'submit' | 'reset'` (default: `button`)
- `iconLeft?: string`
- `iconRight?: string`
- `disabled?: boolean` (default: `false`)
- `className?: string` (default: `''`)

Observações:

- O componente faz `v-bind="$attrs"` no `<button>`, então aceita `id`, `data-*`, `aria-*`, etc.
- `iconLeft`/`iconRight` renderizam o componente [StIcon](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/icon/StIcon.vue). Se o `name` não existir no resolver, o `StIcon` faz fallback para `<span>`.

## Regras internas

### Slot vs icon only

- Quando o slot default estiver vazio e existir `iconLeft` ou `iconRight`, o botão entra em modo `icon only`:
  - remove padding horizontal
  - aplica largura fixa igual à altura (32/40/48)

### Classes e tokens

As classes são geradas por [buildButtonClasses](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/utils/button.ts):

- Base:
  - layout: `inline-flex`, alinhamento central, `gap-ds-2`, `rounded-ds-1`
  - tipografia: `font-body font-semibold`
  - foco: `focus-visible:ring-2 focus-visible:ring-focus`
- Tamanhos:
  - `small` → `h-8 text-ds-sm`
  - `medium` → `h-10 text-ds-base`
  - `large` → `h-12 text-ds-md`
- Disabled:
  - força `bg-surface-3 text-content-disable border-border-2` e `cursor-not-allowed`
- Variantes:
  - `solid`: usa `bg-*` semântico + `hover/active` via opacidade
  - `outline` e `text`: usa `hover:bg-hover active:bg-pressed`

## Testes

Os testes ficam em:

- [StButton.test.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/tests/components/StButton.test.ts)
