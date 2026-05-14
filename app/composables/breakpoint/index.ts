import {
  computed,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  readonly,
  ref
} from 'vue';
import type {
  AppBreakpoint,
  BreakpointsConfig,
  UseBreakpointReturn
} from './useBreakpoint.interface';

const defaultBreakpoints: BreakpointsConfig = {
  sm: 640,
  md: 768,
  lg: 1024
};

const parsePx = (value: string) => {
  const raw = value.trim();
  if (!raw) return null;
  const n = Number.parseFloat(raw.replace('px', ''));
  return Number.isFinite(n) ? n : null;
};

const readCssVarPx = (name: string) => {
  if (globalThis.document === undefined) return null;
  const value = globalThis
    .getComputedStyle(globalThis.document.documentElement)
    .getPropertyValue(name);
  return parsePx(value);
};

const resolveBreakpoints = (): BreakpointsConfig => {
  const sm = readCssVarPx('--breakpoint-sm');
  const md = readCssVarPx('--breakpoint-md');
  const lg = readCssVarPx('--breakpoint-lg');

  return {
    sm: sm ?? defaultBreakpoints.sm,
    md: md ?? defaultBreakpoints.md,
    lg: lg ?? defaultBreakpoints.lg
  };
};

let isInitialized = false;
let subscribers = 0;
let cleanup: null | (() => void) = null;

const width = ref<number | null>(null);
const breakpoints = ref<BreakpointsConfig>(defaultBreakpoints);

const updateWidth = () => {
  width.value = globalThis.window?.innerWidth ?? null;
};

const current = computed<AppBreakpoint>(() => {
  const w = width.value;
  if (w === null) return 'base';
  if (w >= breakpoints.value.lg) return 'lg';
  if (w >= breakpoints.value.md) return 'md';
  if (w >= breakpoints.value.sm) return 'sm';
  return 'base';
});

const initIfNeeded = () => {
  if (isInitialized) {
    if (width.value === null) updateWidth();
    return;
  }

  isInitialized = true;
  breakpoints.value = resolveBreakpoints();
  updateWidth();

  const onResize = () => updateWidth();
  globalThis.window?.addEventListener('resize', onResize, { passive: true });

  cleanup = () => {
    globalThis.window?.removeEventListener('resize', onResize);
    cleanup = null;
    isInitialized = false;
  };
};

export const useBreakpoint = (): UseBreakpointReturn => {
  const hasInstance = Boolean(getCurrentInstance());

  if (hasInstance) {
    onMounted(() => {
      subscribers += 1;
      initIfNeeded();
    });

    onBeforeUnmount(() => {
      subscribers = Math.max(0, subscribers - 1);
      if (subscribers === 0) cleanup?.();
    });
  } else if (import.meta.client) {
    initIfNeeded();
  }

  const isReady = computed(() => width.value !== null);

  const isSmUp = computed(() => (width.value ?? 0) >= breakpoints.value.sm);
  const isMdUp = computed(() => (width.value ?? 0) >= breakpoints.value.md);
  const isLgUp = computed(() => (width.value ?? 0) >= breakpoints.value.lg);

  const isBase = computed(() => current.value === 'base');
  const isSm = computed(() => current.value === 'sm');
  const isMd = computed(() => current.value === 'md');
  const isLg = computed(() => current.value === 'lg');

  return {
    width: readonly(width),
    breakpoints: readonly(breakpoints),
    current,
    isReady,
    isBase,
    isSm,
    isMd,
    isLg,
    isSmUp,
    isMdUp,
    isLgUp
  };
};

export type { AppBreakpoint, BreakpointsConfig, UseBreakpointReturn };
