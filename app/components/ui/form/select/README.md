# StSelect

Componente de select (form) adaptado do design system de referência (React). Ele usa o `StDropdown` como base e renderiza opções via `options` (prop) e/ou via slot (com `StOption`).

## Importação

```ts
import StSelect from '~/components/ui/form/select/StSelect.vue'
// ou
import { StSelect } from '~/components/ui/form/select'
```

## Exemplos

### Usando `options` (prop)

```vue
<script setup lang="ts">
import { ref } from 'vue'
import StSelect from '~/components/ui/form/select/StSelect.vue'

const value = ref<string | number>('')
</script>

<template>
  <StSelect
    v-model:value="value"
    label="Categoria"
    placeholder="Selecione..."
    :options="[
      { name: 'A', value: 'a' },
      { name: 'B', value: 'b' },
      { name: 'C', value: 'c' }
    ]"
  />
  <div>value: {{ value }}</div>
</template>
```

### Usando `StOption` via slot

```vue
<template>
  <StSelect label="Status" placeholder="Selecione...">
    <StOption value="open">Open</StOption>
    <StOption value="closed">Closed</StOption>
    <StOption value="archived">Archived</StOption>
  </StSelect>
</template>
```

### Form submit (hidden input via `name`)

```vue
<template>
  <form>
    <StSelect
      name="category"
      defaultValue="b"
      :options="[
        { name: 'A', value: 'a' },
        { name: 'B', value: 'b' }
      ]"
    />
    <button type="submit">Enviar</button>
  </form>
</template>
```

## API

### Props

- `value?: string | number`  
  Modo controlado (use com `v-model:value`).
- `defaultValue?: string | number`  
  Valor inicial no modo não-controlado.
- `onValueChange?: (value: string) => void`  
  Callback chamado ao selecionar uma opção (o valor é sempre normalizado para string).
- `options?: { name: string; value: string | number }[]`  
  Lista de opções quando você não quer usar slot.
- `icon?: string`  
  Ícone do lado esquerdo no trigger.
- `label?: string`
- `placeholder?: string` (default: `Selecione uma opção`)
- `name?: string`  
  Quando definido, renderiza um `<input type="hidden" />` com o valor atual.
- `required?: boolean` (default: `false`)  
  Controla a validade interna (`isValid`) com base em ter valor selecionado.
- `disabled?: boolean` (default: `false`)
- `readOnly?: boolean` (default: `false`)  
  Impede abrir/alterar o valor, mas mantém o componente focável.
- `messageInfo?: string`
- `messageDanger?: string`
- `messageSuccess?: string`
- `className?: string` (default: `''`)
- `panelClassName?: string` (default: `''`)
- `placement?: StDropdownPlacement` (default: `auto`)
- `offset?: number` (default: `8`)
- `closeOnSelect?: boolean` (default: `true`)

### Slots

- `default`  
  Quando fornecido, espera `StOption` como filhos (os itens são “enhanced” para seleção/activeIndex).

### Eventos

- `update:value (value: string)`  
  Emitido ao selecionar uma opção (para `v-model:value`).
- `value-change (value: string)`  
  Evento adicional equivalente ao callback `onValueChange`.

### Métodos (via `ref`)

O componente expõe:
- `focus()`
- `blur()`
- `clear()`
- `setInvalidity()`
- `setValidity()`
- `reportValidity()`
