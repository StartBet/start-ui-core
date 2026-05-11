# StIcon

Componente de ícone para Nuxt/Vue que replica a API do `StIcon` do projeto anterior (React). Aqui ele usa `@fortawesome/vue-fontawesome` (Font Awesome SVG) e faz fallback para um `<span>` quando o ícone não existir.

## Objetivo

- Padronizar o uso de ícones com API simples (`name`, `lib`, `size`)
- Permitir controle de tamanho via a mesma escala do design system (1..12)
- Garantir fallback seguro quando o ícone não existir

## Arquivos

- Implementação: [StIcon.vue](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/icon/StIcon.vue)
- Export barrel: [index.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/icon/index.ts)
- Builder de classes (size): [icon.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/utils/icon.ts)
- Tipos: [Icon.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/types/Icon.ts)
- Tokens de spacing usados para size (`ds-1..ds-12`): [tailwind.config.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/tailwind.config.ts#L355-L368)

## Como usar

```vue
<template>
  <div class="flex items-center gap-ds-4">
    <StIcon name="plus" :size="2" aria-label="Adicionar" />
    <StIcon name="chevron-right" :size="2" aria-label="Avançar" />
    <StIcon name="settings" :size="3" aria-label="Configurações" />
  </div>
</template>
```

## Props (API)

- `name: string` (obrigatório)
- `lib?: StIconLibrary` (default: `fa`)
  - Atualmente: `fa`
- `size?: StIconSize`
  - `1..12`
- `ariaLabel?: string`
- `className?: string` (default: `''`)

Observação:

- O componente faz `v-bind="$attrs"` no elemento raiz (svg ou span), então aceita `id`, `data-*`, `aria-*`, etc.

## Regras internas

### Resolução do ícone

O `name` é normalizado (lowercase e troca `_` por `-`) e então o componente tenta resolver o ícone no pack **Free Solid** (`@fortawesome/free-solid-svg-icons`) via `findIconDefinition`.

Se o nome não existir (ou estiver digitado errado), o componente não quebra e renderiza apenas um `<span>` vazio (mantendo `className/size` e `ariaLabel`).

### Size (1..12) usando tokens `ds-*`

O size replica o comportamento do projeto anterior (que usava o mapa de spacings).

Aqui, `size` aplica `font-size` usando `spacing.ds-*` do Tailwind:

- `size=1` → `text-[theme(spacing.ds-1)]` (8px)
- `size=2` → `text-[theme(spacing.ds-2)]` (16px)
- ...
- `size=12` → `text-[theme(spacing.ds-12)]` (96px)

O SVG usa `width="1em"` e `height="1em"`, então acompanha o `font-size`.

## Testes

Os testes ficam em:

- [StIcon.test.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/tests/components/StIcon.test.ts)
