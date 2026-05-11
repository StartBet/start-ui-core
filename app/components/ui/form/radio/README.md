# StRadio

Componente de radio (form) adaptado do design system de referência (React). Usa um `<input type="radio">` nativo (oculto visualmente) e um controle customizado com “dot” para o estado selecionado.

## Importação

```ts
import StRadio from '~/components/ui/form/radio/StRadio.vue'
// ou
import { StRadio } from '~/components/ui/form/radio'
```

## Exemplos

### Uso básico (grupo por name)

```vue
<template>
  <div class="grid gap-ds-2">
    <StRadio name="example" value="a" label="Option A" />
    <StRadio name="example" value="b" label="Option B" />
    <StRadio name="example" value="c" label="Option C (disabled)" disabled />
  </div>
</template>
```

### Default checked (não-controlado)

`defaultChecked` só define o estado inicial (o input continua sendo nativo/uncontrolled).

```vue
<template>
  <div class="grid gap-ds-2">
    <StRadio name="example" value="a" label="A" :default-checked="true" />
    <StRadio name="example" value="b" label="B" />
  </div>
</template>
```

### Controlado (`v-model:checked`)

```vue
<script setup lang="ts">
import { ref } from 'vue'
import StRadio from '~/components/ui/form/radio/StRadio.vue'

const checked = ref(false)
</script>

<template>
  <StRadio v-model:checked="checked" label="Controlled single" />
  <div>checked: {{ String(checked) }}</div>
</template>
```

## API

### Props

- `checked?: boolean`  
  Modo controlado. Quando definido, o componente reflete esse valor no input.
- `defaultChecked?: boolean`  
  Modo não-controlado: define apenas o estado inicial.
- `disabled?: boolean`  
  Desabilita o input e aplica estilo de desabilitado.
- `label?: string`  
  Texto do label (se o slot default não for usado).
- `className?: string`  
  Classes adicionais aplicadas no wrapper (`<label>`).

### Slots

- `default`  
  Conteúdo do label. Se fornecido, sobrescreve `label`.

### Eventos

- `update:checked (value: boolean)`  
  Emitido no `change` (usado pelo `v-model:checked`).
- `change (event: Event)`  
  Evento nativo de change do input, reemitido pelo componente.

### Atributos do input

Qualquer atributo extra passado para o componente (ex.: `name`, `value`, `id`, `aria-*`, `data-*`) é encaminhado para o `<input type="radio">`.  
`class` e `style` do componente são aplicados no wrapper (`<label>`).
