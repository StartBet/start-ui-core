<script setup lang="ts">
import { computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { findIconDefinition, library } from '@fortawesome/fontawesome-svg-core';
import type {
  IconDefinition,
  IconName
} from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import type {
  StIconLibrary,
  StIconSize
} from '~/components/ui/icon/StIcon.interface';
import { buildIconClasses } from '~/components/ui/icon/styleStIcon';

library.add(fas);
library.add(fab);

const props = withDefaults(
  defineProps<{
    name: string;
    lib?: StIconLibrary;
    size?: StIconSize;
    ariaLabel?: string;
    className?: string;
  }>(),
  {
    lib: 'fa',
    className: ''
  }
);

const classes = computed(() => buildIconClasses(props));

const normalizeName = (name: string) =>
  name.trim().toLowerCase().replaceAll('_', '-');

const parseIcon = (value: string, fallbackLib: StIconLibrary) => {
  const raw = value.trim();
  const index = raw.indexOf(':');
  if (index <= 0) return { lib: fallbackLib, name: raw };

  const lib = normalizeName(raw.slice(0, index)) as StIconLibrary;
  const name = raw.slice(index + 1);
  return { lib, name };
};

const icon = computed<IconDefinition | undefined>(() => {
  const parsed = parseIcon(props.name, props.lib);
  const iconName = normalizeName(parsed.name) as IconName;
  const prefix = parsed.lib === 'fab' ? 'fab' : 'fas';
  const def = findIconDefinition({ prefix, iconName });
  return def ?? undefined;
});
</script>

<template>
  <span
    :class="classes.container"
    :aria-label="props.ariaLabel"
    v-bind="$attrs"
  >
    <FontAwesomeIcon
      v-if="icon"
      :icon="icon"
      :class="classes.glyph"
      :aria-label="props.ariaLabel"
    />
  </span>
</template>
