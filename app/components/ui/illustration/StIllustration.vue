<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useAttrs, watch } from 'vue';
import { ILLUSTRATIONS } from '~/components/ui/illustration/illustrations';
import type { StIllustrationProps } from '~/components/ui/illustration/StIllustration.interface';
import {
  buildIllustrationSizeClasses,
  getIllustrationCache,
  svgToDataImage
} from '~/components/ui/illustration/styleStIllustration';

defineOptions({ name: 'StIllustration', inheritAttrs: false });

const props = withDefaults(defineProps<StIllustrationProps>(), {
  width: undefined,
  height: undefined,
  className: ''
});

const attrs = useAttrs();
const cache = getIllustrationCache();

const src = ref<string | null>(null);

const sizeClasses = computed(() =>
  buildIllustrationSizeClasses(props.width, props.height)
);
const imgClass = computed(() =>
  [props.className, attrs.class, ...sizeClasses.value].filter(Boolean).join(' ')
);
const imgStyle = computed(() => attrs.style);

const imgWidthAttr = computed(() => {
  if (props.width === undefined) return undefined;
  return /^\d+$/.test(props.width) ? props.width : undefined;
});

const imgHeightAttr = computed(() => {
  if (props.height === undefined) return undefined;
  return /^\d+$/.test(props.height) ? props.height : undefined;
});

const imgAttrs = computed(() => {
  const next: Record<string, unknown> = { ...attrs };
  delete next.class;
  delete next.style;
  return next;
});

let isMounted = true;
let requestId = 0;

const load = async (name: StIllustrationProps['name'], id: number) => {
  const cached = cache.get(name);
  if (cached) {
    src.value = cached;
    return;
  }

  const loader = ILLUSTRATIONS[name];
  if (!loader) {
    src.value = null;
    return;
  }

  try {
    const raw = await loader();
    const dataImage = svgToDataImage(raw);
    cache.set(name, dataImage);
    if (isMounted && id === requestId) src.value = dataImage;
  } catch {
    if (isMounted && id === requestId) src.value = null;
  }
};

watch(
  () => props.name,
  (next) => {
    if (globalThis.window === undefined) return;
    requestId += 1;
    void load(next, requestId);
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  isMounted = false;
});
</script>

<template>
  <img
    v-if="src"
    :src="src"
    :alt="props.alt"
    :width="imgWidthAttr"
    :height="imgHeightAttr"
    :class="imgClass"
    :style="imgStyle"
    v-bind="imgAttrs"
  />
</template>
