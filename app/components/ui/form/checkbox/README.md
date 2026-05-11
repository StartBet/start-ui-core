# StCheckbox

Componente de checkbox (form) adaptado do design system de referência (React). Suporta uso controlado e não-controlado, além de aceitar atributos nativos do `<input>` via `v-bind`.

## Importação

```ts
import StCheckbox from '~/components/ui/form/checkbox/StCheckbox.vue'
// ou
import { StCheckbox } from '~/components/ui/form/checkbox'
```

## Exemplos

### Não-controlado (estado interno)

```vue
<template>
  <StCheckbox label="Receber novidades" name="newsletter" value="yes" :default-checked="true" />
  <StCheckbox disabled label="Desabilitado" />
  <StCheckbox>Label via slot</StCheckbox>
  <StCheckbox aria-label="Sem label visual" />
  <StCheckbox label="Com id" id="terms" />
</template>
```

### Controlado (`v-model:checked`)

```vue
<script setup lang="ts">
import { ref } from 'vue'
import StCheckbox from '~/components/ui/form/checkbox/StCheckbox.vue'

const checked = ref(false)
</script>

<template>
  <StCheckbox v-model:checked="checked" label="Controlled" />
  <div>checked: {{ String(checked) }}</div>
</template>
```

### Controlado (manual via `:checked` + `@update:checked`)

```vue
<script setup lang="ts">
import { ref } from 'vue'
import StCheckbox from '~/components/ui/form/checkbox/StCheckbox.vue'

const checked = ref(false)
</script>

<template>
  <StCheckbox
    :checked="checked"
    label="Controlled"
    @update:checked="(v) => (checked = v)"
    @change="(e) => console.log((e.target as HTMLInputElement).checked)"
  />
</template>
```

## API

### Props

- `checked?: boolean`  
  Modo controlado. Quando definido, o estado visual do componente vem desse valor.
- `defaultChecked?: boolean`  
  Estado inicial no modo não-controlado (quando `checked` não é definido).
- `disabled?: boolean`  
  Desabilita o input e aplica estilo visual de desabilitado.
- `label?: string`  
  Texto do label (se o slot default não for usado).
- `className?: string`  
  Classes adicionais aplicadas no wrapper (`<label>`).

### Slots

- `default`  
  Conteúdo do label. Se fornecido, sobrescreve `label`.

### Eventos

- `update:checked (value: boolean)`  
  Emitido ao alternar o checkbox. Usado pelo `v-model:checked`.
- `change (event: Event)`  
  Evento nativo de change do input, reemitido pelo componente.

### Atributos do input

Qualquer atributo extra passado para o componente (ex.: `name`, `value`, `id`, `aria-*`, `data-*`) é encaminhado para o `<input type="checkbox">`.  
`class` e `style` são aplicados no wrapper (`<label>`).
