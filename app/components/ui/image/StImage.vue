<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  useAttrs,
  watch
} from 'vue';
import type { StImageProps } from '~/components/ui/image/StImage.interface';
import {
  blobToDataImage,
  buildImageSizeClasses,
  getImageCache
} from '~/components/ui/image/styleStImage';

defineOptions({ name: 'StImage', inheritAttrs: false });

const props = withDefaults(defineProps<StImageProps>(), {
  width: undefined,
  height: undefined,
  className: ''
});

const attrs = useAttrs();
const cache = getImageCache();

const dataSrc = ref<string | null>(null);
const isErrored = ref(false);

const sizeClasses = computed(() =>
  buildImageSizeClasses(props.width, props.height)
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
let stop: (() => void) | null = null;

const load = async (src: string, id: number) => {
  isErrored.value = false;
  if (!src) {
    dataSrc.value = null;
    return;
  }

  if (src.startsWith('data:')) {
    dataSrc.value = src;
    return;
  }

  const cached = cache.get(src);
  if (cached) {
    dataSrc.value = cached;
    return;
  }

  try {
    const response = await fetch(src);
    if (!response.ok) throw new Error('Failed to fetch image');
    const blob = await response.blob();
    const dataImage = await blobToDataImage(blob);
    cache.set(src, dataImage);
    if (isMounted && id === requestId) dataSrc.value = dataImage;
  } catch {
    if (isMounted && id === requestId) {
      dataSrc.value = null;
      isErrored.value = true;
    }
  }
};

const displaySrc = computed(() => {
  if (!props.src) return null;
  if (isErrored.value) return null;
  return dataSrc.value ?? props.src;
});

onMounted(() => {
  stop = watch(
    () => props.src,
    (next) => {
      requestId += 1;
      void load(next, requestId);
    },
    { immediate: true }
  );
});

onBeforeUnmount(() => {
  isMounted = false;
  stop?.();
});
</script>

<template>
  <img
    v-if="displaySrc"
    :src="displaySrc"
    :alt="props.alt"
    :width="imgWidthAttr"
    :height="imgHeightAttr"
    :class="imgClass"
    :style="imgStyle"
    v-bind="imgAttrs"
  />
</template>
