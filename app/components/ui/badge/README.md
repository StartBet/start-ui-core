# StBadge

Componente de badge para Nuxt/Vue que replica a API e as regras internas do `StBadge` do projeto anterior (React), mas usando Tailwind e os tokens semânticos do projeto.

## Objetivo

- Exibir um badge numérico/textual (ex.: contagem) ou um “dot” quando não houver `value`
- Suportar variações semânticas (`variant`) e tamanhos (`size`)
- Suportar animação de pulse (`pulse`) no anel (ring)
- Centralizar regras de formatação e classes em funções puras (fácil de testar)

## Arquivos

- Implementação: [StBadge.vue](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/badge/StBadge.vue)
- Builder/formatters: [badge.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/utils/badge.ts)
- Tipos: [Badge.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/types/Badge.ts)
- Testes: [StBadge.test.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/tests/components/StBadge.test.ts)

## Como usar

### Exemplo básico (dot)

Sem `value`, o componente vira um dot.

```vue
<template>
  <StBadge />
</template>
```

### Exemplo com valor

```vue
<template>
  <StBadge :value="7" />
</template>
```

### Exemplo com variant/size/pulse

```vue
<template>
  <div class="flex items-center gap-ds-4">
    <StBadge variant="info" :value="12" />
    <StBadge variant="negative" :value="120" />
    <StBadge variant="warning" size="medium" pulse />
  </div>
</template>
```

## Props (API)

- `variant?: StBadgeVariant` (default: `info`)
  - `info | system | warning | positive | negative`
- `size?: StBadgeSize` (default: `small`)
  - `small | medium`
- `value?: number | string`
  - Se `value` for `undefined`/string vazia, renderiza como dot
- `pulse?: boolean` (default: `false`)
  - Aplica `animate-ping` no ring
- `className?: string` (default: `''`)
  - Classe extra anexada ao final do container

Observação:

- `StBadge` faz `v-bind="$attrs"` no elemento raiz, então você pode passar `id`, `data-*`, `aria-*`, `title`, etc.

## Regras internas

### Dot vs value

- Dot acontece quando não existe valor válido:
  - `value` é `undefined`, ou
  - `value` é string vazia
- Se `value` existir:
  - renderiza o texto formatado
  - remove o “estilo de dot” (sem `w-[10px]`/`p-0` no `small`, por exemplo)

### Formatação do value

Regras implementadas em [formatBadgeValue](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/utils/badge.ts#L6-L10):

- `number > 99` → `99+`
- `string.length > 4` → mantém os 4 primeiros caracteres e adiciona `…` (ellipsis)
- Caso contrário, renderiza o valor normal

### Ring e pulse

O badge sempre renderiza um elemento de ring (um `<span aria-hidden="true" />`) que:

- cobre o container (`absolute inset-0`)
- usa `border` com a cor da variante (`border-info`, `border-negative`, etc.)
- recebe `animate-ping` quando `pulse=true`

## Estilo e tokens

- As cores do badge usam classes semânticas do Tailwind:
  - background: `bg-info | bg-system | bg-warning | bg-positive | bg-negative`
  - ring/border: `border-info | border-system | ...`
  - texto: `text-content-din` ou `text-content-bright` (dependendo da variante)
- Os tamanhos são centralizados em [badge.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/utils/badge.ts#L12-L29):
  - dot usa classes do próprio Tailwind (`h-2.5 w-2.5` = 10px; `h-3 w-3` = 12px)
  - value usa `px-ds-1` quando possível e mantém altura do design via `h-[18px]`/`h-[22px]`

## Testes

Os testes validam:

- render default como dot (sem `value`)
- render com `value` numérico e string
- regras de formatação (`99+`, truncamento com `…`)
- `pulse=true` aplicando `animate-ping`
- `size="medium"`
- `className` anexado ao container
