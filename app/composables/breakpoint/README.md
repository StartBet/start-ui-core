# useBreakpoint

Composable para detectar o breakpoint atual via JavaScript.

## Como funciona

- Lê `window.innerWidth` e atualiza em `resize`.
- Calcula o breakpoint atual:
  - `base` (< `sm`)
  - `sm` (>= `sm` e < `md`)
  - `md` (>= `md` e < `lg`)
  - `lg` (>= `lg`)

## Breakpoints

- Por padrão usa os valores do Tailwind (defaults):
  - `sm = 640`
  - `md = 768`
  - `lg = 1024`
- Se existirem CSS vars no `:root`, elas sobrescrevem:
  - `--breakpoint-sm`
  - `--breakpoint-md`
  - `--breakpoint-lg`

## Uso

```ts
const { current, isSmUp, isMdUp, isLgUp } = useBreakpoint();
```
