# StRadioGroup

Componente de agrupamento de radios adaptado do design system de referência (React). Ele organiza o layout do grupo e coordena `name`, `checked` e `disabled` dos `StRadio` internos via `provide/inject`.

## Importação

```ts
import StRadioGroup from '~/components/ui/form/radio-group/StRadioGroup.vue'
// ou
import { StRadioGroup } from '~/components/ui/form/radio-group'
```

## Exemplos

### Não-controlado (defaultValue)

```vue
<template>
  <StRadioGroup defaultValue="a">
    <StRadio value="a" label="Option A" />
    <StRadio value="b" label="Option B" />
    <StRadio value="c" label="Option C" />
  </StRadioGroup>
</template>
```

### Controlado (`v-model:value`)

```vue
<script setup lang="ts">
import { ref } from 'vue'
import StRadioGroup from '~/components/ui/form/radio-group/StRadioGroup.vue'
import StRadio from '~/components/ui/form/radio/StRadio.vue'

const value = ref('b')
</script>

<template>
  <StRadioGroup v-model:value="value">
    <StRadio value="a" label="Option A" />
    <StRadio value="b" label="Option B" />
    <StRadio value="c" label="Option C" />
  </StRadioGroup>
  <div>value: {{ value }}</div>
</template>
```

### name e disabled no grupo

Se `name` não for fornecido, o componente gera um nome automaticamente e aplica em todos os `StRadio` filhos (desde que o filho não sobrescreva `name`).

```vue
<template>
  <StRadioGroup name="example" disabled>
    <StRadio value="a" label="A" />
    <StRadio value="b" label="B" />
  </StRadioGroup>
</template>
```

### Layout (orientation + dense)

```vue
<template>
  <StRadioGroup orientation="horizontal">
    <StRadio value="a" label="A" />
    <StRadio value="b" label="B" />
    <StRadio value="c" label="C" />
  </StRadioGroup>

  <StRadioGroup dense>
    <StRadio value="a" label="A" />
    <StRadio value="b" label="B" />
  </StRadioGroup>
</template>
```

## API

### Props

- `name?: string`  
  Nome do grupo. Se omitido, um nome é gerado automaticamente.
- `value?: string`  
  Modo controlado.
- `defaultValue?: string`  
  Valor inicial no modo não-controlado.
- `onValueChange?: (value: string) => void`  
  Callback chamado quando o valor muda.
- `disabled?: boolean` (default: `false`)  
  Desabilita o grupo (propagado para os `StRadio` filhos).
- `dense?: boolean` (default: `false`)  
  Reduz o espaçamento entre os itens.
- `orientation?: 'vertical' | 'horizontal'` (default: `vertical`)  
  Controla direção e espaçamento.
- `className?: string` (default: `''`)  
  Classes extras aplicadas no container.

### Eventos

- `update:value (value: string)`  
  Emitido quando o valor muda (para `v-model:value`).
- `value-change (value: string)`  
  Evento adicional equivalente ao callback `onValueChange`.

### Observações

- O grupo escuta o evento `change` no container e atualiza o estado com base no `target.value` do `<input type="radio">`.
- `StRadio` usa `provide/inject` para receber `name`, `value` e `disabled` do grupo quando estiver dentro de um `StRadioGroup`.
