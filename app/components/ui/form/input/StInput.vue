<script setup lang="ts">
import { computed, ref, useAttrs, watch } from 'vue';
import StIcon from '~/components/ui/icon/StIcon.vue';
import type {
  StInputProps,
  StInputRef
} from '~/components/ui/form/input/StInput.interface';
import {
  applyInputMask,
  buildInputClasses,
  getCounterClassName,
  resolveInputType
} from '~/components/ui/form/input/styleStInput';

defineOptions({ name: 'StInput', inheritAttrs: false });

const props = withDefaults(defineProps<StInputProps>(), {
  value: undefined,
  defaultValue: undefined,
  icon: undefined,
  label: undefined,
  type: 'text',
  mask: undefined,
  messageInfo: undefined,
  messageDanger: undefined,
  messageSuccess: undefined,
  name: undefined,
  disabled: false,
  readOnly: false,
  placeholder: undefined,
  maxLength: undefined,
  min: undefined,
  max: undefined,
  autoComplete: undefined,
  required: false,
  pattern: undefined,
  inputMode: undefined,
  className: ''
});

const emit = defineEmits<{
  'update:value': [value: string | number];
  input: [event: Event];
  change: [event: Event];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  keydown: [event: KeyboardEvent];
  keyup: [event: KeyboardEvent];
  click: [event: MouseEvent];
}>();

const attrs = useAttrs();
const inputRef = ref<HTMLInputElement | null>(null);

const isControlled = computed(() => props.value !== undefined);
const internalValue = ref<string | number>(props.defaultValue ?? '');

const isValid = ref(true);
const initialTextValue = (() => {
  if (typeof props.value === 'string')
    return applyInputMask(props.mask, props.value);
  if (typeof props.defaultValue === 'string')
    return applyInputMask(props.mask, props.defaultValue);
  return '';
})();
const charCount = ref(initialTextValue.length);

const hasCounter = computed(() => typeof props.maxLength === 'number');
const hasIcon = computed(() => Boolean(props.icon));

const resolvedType = computed(() => resolveInputType(props.type));

const resolvedValue = computed(() =>
  isControlled.value ? (props.value as string | number) : internalValue.value
);

const displayValue = computed(() => {
  const v = resolvedValue.value;
  if (typeof v === 'string') return applyInputMask(props.mask, v);
  return v;
});

const classes = computed(() =>
  buildInputClasses({
    disabled: props.disabled,
    isValid: isValid.value,
    hasIcon: hasIcon.value,
    hasCounter: hasCounter.value,
    className: props.className
  })
);

const wrapperClass = computed(() =>
  [classes.value.wrapper, attrs.class].filter(Boolean).join(' ')
);
const wrapperStyle = computed(() => attrs.style);

const inputAttrs = computed(() => {
  const next: Record<string, unknown> = { ...attrs };
  delete next.class;
  delete next.style;
  return next;
});

const syncCount = (value: string) => {
  if (hasCounter.value) charCount.value = value.length;
};

const updateValidityFromEl = (el: HTMLInputElement | null) => {
  if (!el) return;
  isValid.value = el.checkValidity();
};

const updateValue = (value: string) => {
  const next = props.mask ? applyInputMask(props.mask, value) : value;
  if (!isControlled.value) internalValue.value = next;
  emit('update:value', next);
  syncCount(next);
  return next;
};

const handleInput = (e: Event) => {
  const el = e.target instanceof HTMLInputElement ? e.target : null;
  if (!el) return;

  const next = updateValue(el.value);
  if (props.mask) el.value = next;
  emit('input', e);
};

const handleChange = (e: Event) => {
  const el = e.target instanceof HTMLInputElement ? e.target : null;
  updateValidityFromEl(el);
  emit('change', e);
};

const handleFocus = (e: FocusEvent) => {
  emit('focus', e);
};

const handleBlur = (e: FocusEvent) => {
  const el = e.target instanceof HTMLInputElement ? e.target : null;
  updateValidityFromEl(el);
  emit('blur', e);
};

const handleKeydown = (e: KeyboardEvent) => emit('keydown', e);
const handleKeyup = (e: KeyboardEvent) => emit('keyup', e);
const handleClick = (e: MouseEvent) => emit('click', e);

const clear = () => {
  const el = inputRef.value;
  if (!el) return;
  if (el.value.length === 0) return;
  el.value = '';
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
};

const exposed: StInputRef = {
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  clear,
  setInvalidity: () => {
    isValid.value = false;
  },
  setValidity: () => {
    isValid.value = true;
  },
  reportValidity: () => {
    const v = inputRef.value?.reportValidity() ?? true;
    isValid.value = v;
  }
};

defineExpose(exposed);

watch(
  () => displayValue.value,
  (next) => {
    if (!hasCounter.value) return;
    if (typeof next !== 'string') return;
    charCount.value = next.length;
  }
);
</script>

<template>
  <label :class="wrapperClass" :style="wrapperStyle">
    <span v-if="props.label" :class="classes.label">{{ props.label }}</span>

    <div :class="classes.inputContainer">
      <div v-if="hasIcon" :class="classes.iconContainer" aria-hidden="true">
        <StIcon :name="props.icon as string" :size="2" aria-label="icon" />
      </div>

      <input
        ref="inputRef"
        :class="classes.input"
        :type="resolvedType"
        :name="props.name"
        :disabled="props.disabled"
        :readonly="props.readOnly"
        :placeholder="props.placeholder"
        :maxlength="props.maxLength"
        :min="props.min"
        :max="props.max"
        :autocomplete="props.autoComplete"
        :required="props.required"
        :pattern="props.pattern"
        :inputmode="props.inputMode"
        :value="displayValue"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
        @keyup="handleKeyup"
        @click="handleClick"
        v-bind="inputAttrs"
      />

      <span
        v-if="hasCounter"
        :class="
          getCounterClassName(props.maxLength as number, charCount, classes)
        "
      >
        {{ Math.max(0, (props.maxLength as number) - charCount) }}
      </span>
    </div>

    <span
      v-if="isValid && !props.messageSuccess && props.messageInfo"
      :class="classes.messageInfo"
    >
      {{ props.messageInfo }}
    </span>
    <span v-if="!isValid && props.messageDanger" :class="classes.messageDanger">
      {{ props.messageDanger }}
    </span>
    <span
      v-if="isValid && props.messageSuccess"
      :class="classes.messageSuccess"
    >
      {{ props.messageSuccess }}
    </span>
  </label>
</template>
