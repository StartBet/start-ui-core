# StSwitch

Componente de switch (form) adaptado do design system de referência (React). Suporta uso controlado e não-controlado, encaminhando atributos nativos do `<input>` via `v-bind`.

## Importação

```ts
import StSwitch from '~/components/ui/form/switch/StSwitch.vue'
// ou
import { StSwitch } from '~/components/ui/form/switch'
```

## Exemplos

### Não-controlado (estado interno)

```vue
<template>
  <StSwitch label="Ativo" :default-checked="true" name="active" />
  <StSwitch disabled label="Disabled" />
  <StSwitch>Label via slot</StSwitch>
  <StSwitch aria-label="Sem label visual" />
</template>
```

### Controlado (`v-model:checked`)

```vue
<script setup lang="ts">
import { ref } from 'vue'
import StSwitch from '~/components/ui/form/switch/StSwitch.vue'

const checked = ref(false)
</script>

<template>
  <StSwitch v-model:checked="checked" label="Controlled" />
  <div>checked: {{ String(checked) }}</div>
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
  Emitido ao alternar o switch. Usado pelo `v-model:checked`.
- `change (event: Event)`  
  Evento nativo de change do input, reemitido pelo componente.

### Atributos do input

Qualquer atributo extra passado para o componente (ex.: `name`, `id`, `aria-*`, `data-*`) é encaminhado para o `<input type="checkbox" role="switch">`.  
`class` e `style` são aplicados no wrapper (`<label>`).

