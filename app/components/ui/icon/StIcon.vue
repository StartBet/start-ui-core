<script setup lang="ts">
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { findIconDefinition, library } from '@fortawesome/fontawesome-svg-core'
import type { IconDefinition, IconName } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import type { StIconLibrary, StIconSize } from '~/components/ui/icon/StIcon.interface'
import { buildIconClasses } from '~/components/ui/icon/styleStIcon'

library.add(fas)

const props = withDefaults(
  defineProps<{
    name: string
    lib?: StIconLibrary
    size?: StIconSize
    ariaLabel?: string
    className?: string
  }>(),
  {
    lib: 'fa',
    className: ''
  }
)

const classes = computed(() => buildIconClasses(props))

const normalizeName = (name: string) => name.trim().toLowerCase().replaceAll('_', '-')

const icon = computed<IconDefinition | undefined>(() => {
  const iconName = normalizeName(props.name) as IconName
  const def = findIconDefinition({ prefix: 'fas', iconName })
  return def ?? undefined
})
</script>

<template>
  <FontAwesomeIcon
    v-if="icon"
    :icon="icon"
    :class="classes"
    role="img"
    :aria-label="props.ariaLabel"
    v-bind="$attrs"
  />
  <span v-else :class="classes" :aria-label="props.ariaLabel" v-bind="$attrs" />
</template>
