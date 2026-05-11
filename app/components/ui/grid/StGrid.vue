<script setup lang="ts">
import { computed } from 'vue'
import type { GridSpacing } from '~/components/ui/grid/StGrid.interface'
import { buildGridClasses } from '~/components/ui/grid/styleStGrid'

const props = withDefaults(
  defineProps<{
    cols?: GridSpacing
    gap?: GridSpacing
    gapX?: GridSpacing
    gapY?: GridSpacing
    smCols?: GridSpacing
    mdCols?: GridSpacing
    lgCols?: GridSpacing
    padding?: string
    smPadding?: string
    mdPadding?: string
    lgPadding?: string
    margin?: string
    smMargin?: string
    mdMargin?: string
    lgMargin?: string
    className?: string
  }>(),
  {
    cols: 1,
    className: ''
  }
)

const gridClasses = computed(() => buildGridClasses(props))
</script>

<template>
  <div :class="gridClasses" v-bind="$attrs">
    <slot />
  </div>
</template>
