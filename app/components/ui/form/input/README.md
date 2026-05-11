# StInput

Componente de input (form) adaptado do design system de referência (React). Suporta modo controlado e não-controlado, máscara opcional, contador de caracteres e mensagens de feedback (info/danger/success).

## Importação

```ts
import StInput from '~/components/ui/form/input/StInput.vue'
// ou
import { StInput } from '~/components/ui/form/input'
```

## Exemplos

### Não-controlado (estado interno)

```vue
<template>
  <StInput label="Username" name="username" placeholder="Type your username" />
  <StInput disabled label="Disabled" placeholder="Disabled" />
  <StInput read-only label="Read only" value="Readonly value" />
</template>
```

### Controlado (`v-model:value`)

```vue
<script setup lang="ts">
import { ref } from 'vue'
import StInput from '~/components/ui/form/input/StInput.vue'

const value = ref('')
</script>

<template>
  <StInput
    v-model:value="value"
    label="Controlled"
    placeholder="Type..."
    :max-length="20"
    messageInfo="Use 4-20 characters"
  />
  <div>value: {{ value }}</div>
</template>
```

### Máscara (`phone-br`)

```vue
<script setup lang="ts">
import { ref } from 'vue'
import StInput from '~/components/ui/form/input/StInput.vue'

const phone = ref('')
</script>

<template>
  <StInput
    v-model:value="phone"
    type="tel"
    input-mode="tel"
    label="Telefone"
    placeholder="(31) 99555-5555"
    mask="phone-br"
  />
</template>
```

### Mensagens (info/danger/success)

O componente mantém um estado interno de validade (`isValid`) baseado em `checkValidity()`:
- atualiza ao `change` e ao `blur`
- pode ser controlado manualmente via métodos expostos (`setInvalidity`, `setValidity`, `reportValidity`)

```vue
<template>
  <StInput
    required
    label="Email"
    type="email"
    placeholder="name@domain.com"
    messageInfo="Informe um email válido"
    messageDanger="Email inválido"
    messageSuccess="Tudo certo"
  />
</template>
```

### Métodos imperativos (via `ref`)

O componente expõe métodos semelhantes ao componente React:
- `focus()`
- `blur()`
- `clear()`
- `setInvalidity()`
- `setValidity()`
- `reportValidity()`

```vue
<script setup lang="ts">
import { ref } from 'vue'
import StInput from '~/components/ui/form/input/StInput.vue'
import type { StInputRef } from '~/components/ui/form/input/StInput.interface'

const inputRef = ref<StInputRef | null>(null)
const value = ref('')
</script>

<template>
  <div class="grid gap-ds-2">
    <StInput ref="inputRef" v-model:value="value" label="Imperative" required />
    <div class="flex gap-ds-2">
      <StButton size="small" @click="inputRef?.focus()">focus()</StButton>
      <StButton size="small" @click="inputRef?.blur()">blur()</StButton>
      <StButton size="small" @click="inputRef?.clear()">clear()</StButton>
      <StButton size="small" @click="inputRef?.setInvalidity()">setInvalidity()</StButton>
      <StButton size="small" @click="inputRef?.setValidity()">setValidity()</StButton>
      <StButton size="small" @click="inputRef?.reportValidity()">reportValidity()</StButton>
    </div>
  </div>
</template>
```

## API

### Props

- `value?: string | number`  
  Modo controlado (use com `v-model:value`).
- `defaultValue?: string | number`  
  Valor inicial no modo não-controlado (quando `value` não é fornecido).
- `label?: string`  
  Label exibido acima do input.
- `icon?: string`  
  Nome do ícone exibido dentro do input (depende do catálogo do `StIcon`).
- `type?: 'text' | 'password' | 'email' | 'search' | 'tel' | 'url' | 'number' | 'date' | 'datetime' | 'datetime-local' | 'month' | 'week' | 'time'`  
  Tipo do input. `datetime` é normalizado para `datetime-local`.
- `mask?: 'phone-br'`  
  Aplica máscara no valor digitado.
- `maxLength?: number`  
  Habilita contador interno (mostra caracteres restantes).
- `messageInfo?: string`  
  Exibida quando válido e sem `messageSuccess`.
- `messageDanger?: string`  
  Exibida quando inválido.
- `messageSuccess?: string`  
  Exibida quando válido.
- Props nativas mais comuns (todas opcionais): `name`, `disabled`, `readOnly`, `placeholder`, `min`, `max`, `autoComplete`, `required`, `pattern`, `inputMode`
- `className?: string`  
  Classes adicionais aplicadas diretamente no `<input>`.

### Eventos

- `update:value (value: string | number)`  
  Emitido ao digitar (usado pelo `v-model:value`).
- `input (event: Event)`
- `change (event: Event)`
- `focus (event: FocusEvent)`
- `blur (event: FocusEvent)`
- `keydown (event: KeyboardEvent)`
- `keyup (event: KeyboardEvent)`
- `click (event: MouseEvent)`

### Atributos do input

Qualquer atributo adicional passado no componente (ex.: `id`, `aria-*`, `data-*`) é encaminhado para o `<input>`.  
`class` e `style` do componente são aplicados no wrapper (`<label>`).
