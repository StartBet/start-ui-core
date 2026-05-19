# Start UI Core (StartBet)

Projeto visual para a nova interface da **StartBet**. Este repositório concentra os componentes de UI e páginas (Nuxt) usados para prototipar e evoluir a experiência do produto.

## Stack

- Nuxt (Vue 3)
- TailwindCSS
- Pinia (stores)
- Vitest + @vue/test-utils (testes)

## Requisitos

- Node.js (recomendado: versão LTS)
- npm (ou o gerenciador de pacotes da sua preferência)

## Instalação

```bash
npm install
```

## Rodar em desenvolvimento

Sobe o servidor em `http://localhost:3000`:

```bash
npm run dev
```

## Scripts úteis

```bash
# build de produção
npm run build

# preview do build
npm run preview

# testes
npm run test
npm run test:run

# formatação
npm run format
npm run format:check
```

## Arquitetura do projeto

A estrutura segue o padrão do Nuxt com diretório `app/` e módulos organizados por domínio/UI:

- `app/pages/`: páginas da aplicação. As rotas são registradas no `nuxt.config.ts` via hook `pages:extend`.
- `app/layouts/`: layouts (ex.: `default`) que compõem header/navbar/footer e encapsulam as páginas.
- `app/components/`:
  - `ui/`: componentes atômicos e reutilizáveis do design system (ex.: `paper`, `typography`, `grid`, `icon`, `image`, `illustration`).
  - `domain/`: componentes de “negócio” compostos (ex.: cards e módulos de tela).
- `app/stores/`: stores Pinia (estado global, ex.: side nav).
- `app/services/`: serviços/composables que fornecem dados e regras (ex.: catálogo de jogos e providers).
- `app/composables/`: hooks reutilizáveis (ex.: breakpoints).
- `app/utils/`: utilitários (ex.: SEO snippets, helpers de layout, parsing).
- `assets/`:
  - `assets/imgs/`: imagens raster (ex.: capas/backgrounds).
  - `assets/illustrations/`: SVGs usados pelo componente `StIllustration` (carregamento via registry em `app/components/ui/illustration/illustrations/*`).

## Padrão dos componentes

Em geral, os componentes seguem um “kit” por pasta (especialmente em `ui/` e `domain/`):

- `Componente.vue`: implementação
- `Componente.interface.ts`: props/tipos
- `styleComponente.ts`: builder de classes/utilitários de estilo
- `Componente.test.ts`: testes
- `index.ts`: exports

Isso facilita manutenção, testes e consistência do design system.
