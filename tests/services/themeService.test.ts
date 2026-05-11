import { mount } from '@vue/test-utils';
import type { ShallowUnwrapRef } from 'vue';
import { defineComponent, nextTick } from 'vue';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('nuxt/app', async () => {
  const vue = await import('vue');

  const state = new Map<string, unknown>();
  const headCalls: unknown[] = [];

  const useState = <T>(key: string, init: () => T) => {
    if (!state.has(key)) state.set(key, vue.ref(init()));
    return state.get(key) as ReturnType<typeof vue.ref<T>>;
  };

  const useHead = (input: unknown) => {
    headCalls.push(input);
  };

  const __reset = () => {
    state.clear();
    headCalls.length = 0;
  };

  return { useState, useHead, __headCalls: headCalls, __reset };
});

import type { AppTheme } from '~/services/themeService';
import { useThemeService } from '~/services/themeService';

describe('useThemeService', () => {
  beforeEach(async () => {
    const nuxtApp = (await import('nuxt/app')) as unknown as {
      __reset: () => void;
    };
    nuxtApp.__reset();
    delete document.documentElement.dataset.theme;
  });

  it('inicializa com dark e expõe setTheme normalizando valores', async () => {
    const nuxtApp = (await import('nuxt/app')) as unknown as {
      __headCalls: unknown[];
    };

    const Host = defineComponent({
      setup() {
        return useThemeService();
      },
      template: '<div />'
    });

    const wrapper = mount(Host);
    type ThemeVm = ShallowUnwrapRef<ReturnType<typeof useThemeService>>;
    type HeadFn = () => { htmlAttrs: Record<string, string> };
    const vm = wrapper.vm as unknown as ThemeVm;

    expect(nuxtApp.__headCalls).toHaveLength(1);
    const headInput = nuxtApp.__headCalls[0];
    expect(typeof headInput).toBe('function');
    expect((headInput as HeadFn)().htmlAttrs['data-theme']).toBe('dark');

    vm.setTheme('light');
    await nextTick();
    expect(vm.theme).toBe('light');
    expect((headInput as HeadFn)().htmlAttrs['data-theme']).toBe('light');

    vm.setTheme('invalid' as unknown as AppTheme);
    await nextTick();
    expect(vm.theme).toBe('dark');
  });

  it('syncFromDom reflete o data-theme do <html>', async () => {
    document.documentElement.dataset.theme = 'light';

    const Host = defineComponent({
      setup() {
        return useThemeService();
      },
      template: '<div />'
    });

    const wrapper = mount(Host);
    type ThemeVm = ShallowUnwrapRef<ReturnType<typeof useThemeService>>;
    const vm = wrapper.vm as unknown as ThemeVm;
    await nextTick();

    expect(vm.theme).toBe('light');

    document.documentElement.dataset.theme = 'dark';
    vm.syncFromDom();
    await nextTick();

    expect(vm.theme).toBe('dark');
  });
});
