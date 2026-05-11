<script setup lang="ts">
import { computed } from 'vue'
import type {
  FontFamily,
  FontSize,
  FontWeight,
  LetterSpacing,
  LineHeight,
  TextAlign,
  TypographyElement,
  TypographyVariant
} from '~/components/ui/typography/StTypography.interface'
import { buildTypographyClasses } from '~/components/ui/typography/styleStTypography'

const props = withDefaults(
  defineProps<{
    variant?: TypographyVariant
    as?: TypographyElement
    size?: FontSize
    weight?: FontWeight
    family?: FontFamily
    lineHeight?: LineHeight
    letterSpacing?: LetterSpacing
    align?: TextAlign
    italic?: boolean
    underline?: boolean
    strikethrough?: boolean
    uppercase?: boolean
    lowercase?: boolean
    capitalize?: boolean
    truncate?: boolean
    maxLines?: number
    className?: string
  }>(),
  {
    variant: 'body-medium',
    as: 'p',
    italic: false,
    underline: false,
    strikethrough: false,
    uppercase: false,
    lowercase: false,
    capitalize: false,
    truncate: false,
    className: ''
  }
)

const classes = computed(() => buildTypographyClasses(props))
</script>

<template>
  <component :is="props.as" :class="classes" v-bind="$attrs">
    <slot />
  </component>
</template>
