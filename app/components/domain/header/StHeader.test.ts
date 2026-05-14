import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';

vi.mock('nuxt/app', () => ({
  navigateTo: vi.fn()
}));

vi.mock('~/services/themeService', () => ({
  useThemeService: () => ({ theme: ref<'dark' | 'light'>('dark') })
}));

vi.mock('~/components/ui/illustration/StIllustration.vue', () => ({
  default: { template: '<img />' }
}));

import StHeader from '~/components/domain/header/StHeader.vue';
import { useSideNavStore } from '~/stores/sideNavStore';

describe('StHeader', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renderiza e alterna o menu via store', async () => {
    const pinia = createPinia();
    setActivePinia(pinia);

    const wrapper = mount(StHeader, {
      global: {
        plugins: [pinia],
        stubs: {
          NuxtLink: { template: '<a><slot /></a>' }
        }
      }
    });

    const store = useSideNavStore();

    expect(wrapper.find('header').exists()).toBe(true);
    expect(wrapper.find('button[aria-label="Abrir menu"]').exists()).toBe(true);
    expect(store.isOpen).toBe(false);

    await wrapper.find('button[aria-label="Abrir menu"]').trigger('click');

    expect(store.isOpen).toBe(true);
    expect(wrapper.find('button[aria-label="Fechar menu"]').exists()).toBe(
      true
    );

    await wrapper.find('button[aria-label="Fechar menu"]').trigger('click');

    expect(store.isOpen).toBe(false);
    expect(wrapper.find('button[aria-label="Abrir menu"]').exists()).toBe(true);
  });
});
