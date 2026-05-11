# StIllustration

Componente para renderizar ilustrações SVG do design system via `name`, replicando o padrão do projeto anterior (React):

- Os SVGs ficam em `assets/illustrations/**`.
- O cadastro/registry fica em `app/components/ui/illustration/illustrations/*`.
- O componente carrega o SVG como string (`?raw`), converte para `data:image/svg+xml` e renderiza em um `<img>`.
- Faz cache em memória por `name` para evitar recarregar o mesmo SVG.

Implementação: [StIllustration.vue](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/illustration/StIllustration.vue)

## Import

```ts
import { StIllustration } from '~/components/ui/illustration'
```

## Props

- `name: StIllustrationName` (obrigatório)
- `alt: string` (obrigatório)
- `width?: number | string`
- `height?: number | string`
- `className?: string`

Tipagem: [Illustration.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/types/Illustration.ts)

## Names (catálogo)

O catálogo vem do registry `ILLUSTRATIONS`:

- Registry: [illustrations/index.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/illustration/illustrations/index.ts)
- Brands: [brand.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/illustration/illustrations/brand.ts)
- Characters: [characters.ts](file:///c:/Users/Lucas%20Murta/Desktop/projects/start-nuxt-core/app/components/ui/illustration/illustrations/characters.ts)

Os nomes seguem o formato `categoria/arquivo`, por exemplo:

- `brand/brand-dark`
- `brand/brand-light`
- `characters/character-soccer-1`

## Uso

```vue
<template>
  <div class="flex items-center gap-ds-2">
    <StIllustration name="brand/brand-dark" alt="Brand dark" width="56" height="56" />
    <StIllustration
      name="characters/character-soccer-1"
      alt="Personagem soccer"
      width="120"
      className="rounded-ds-2"
    />
  </div>
</template>
```

## Observações

- SSR: por padrão o carregamento acontece apenas no client (o componente renderiza nada até carregar).
- Atributos extras (`loading`, `decoding`, etc.) podem ser passados via `$attrs` e serão aplicados no `<img>`.

