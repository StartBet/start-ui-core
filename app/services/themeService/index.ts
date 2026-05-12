import { computed, onMounted } from 'vue';
import { useState, useHead } from 'nuxt/app';

export type AppTheme = 'dark' | 'light';

const normalizeTheme = (value: unknown): AppTheme =>
  value === 'light' ? 'light' : 'dark';

export function useThemeService() {
  const theme = useState<AppTheme>('app-theme', () => 'dark');

  useHead(() => ({
    htmlAttrs: {
      'data-theme': theme.value
    }
  }));

  const setTheme = (next: AppTheme) => {
    theme.value = normalizeTheme(next);
  };

  const syncFromDom = () => {
    if (globalThis.document === undefined) return;
    theme.value = normalizeTheme(
      globalThis.document.documentElement.dataset.theme
    );
  };

  onMounted(() => {
    syncFromDom();
  });

  const isDark = computed(() => theme.value === 'dark');
  const isLight = computed(() => theme.value === 'light');

  return { theme, isDark, isLight, setTheme, syncFromDom };
}
