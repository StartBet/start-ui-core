import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { describe, expect, it, vi } from 'vitest';

vi.mock('vue-router', () => ({
  useRoute: () => ({ path: '/cassino' })
}));

vi.mock('nuxt/app', () => ({
  navigateTo: vi.fn()
}));

import StNavbar from '~/components/domain/navbar/StNavbar.vue';
import { useSideNavStore } from '~/stores/sideNavStore';

describe('StNavbar', () => {
  it('renderiza itens quando está aberto', () => {
    const pinia = createPinia();
    setActivePinia(pinia);

    const wrapper = mount(StNavbar, {
      global: {
        plugins: [pinia],
        stubs: {
          StIcon: { template: '<span data-stub="StIcon" />' }
        }
      }
    });

    expect(wrapper.find('aside').exists()).toBe(true);
    expect(wrapper.text()).toContain('Cassino');
  });

  it('renderiza modo compacto (botões com aria-label) quando está fechado', () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    useSideNavStore().close();

    const wrapper = mount(StNavbar, {
      global: {
        plugins: [pinia],
        stubs: {
          StIcon: { template: '<span data-stub="StIcon" />' }
        }
      }
    });

    expect(wrapper.find('button[aria-label="Cassino"]').exists()).toBe(true);
  });
});
