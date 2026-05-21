import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('~/components/ui/loading/StLoading.vue', () => ({
  default: {
    props: ['type', 'variant', 'value'],
    template:
      '<div data-testid="loading" :data-type="type" :data-variant="variant" :data-value="value" />'
  }
}));

import StLoadingScreen from './StLoadingScreen.vue';

describe('StLoadingScreen', () => {
  it('renderiza Paper full e centraliza Loading', () => {
    const wrapper = mount(StLoadingScreen, {
      global: {
        stubs: {
          StPaper: {
            props: ['variant', 'width', 'height', 'className'],
            template:
              '<div :data-variant="variant" :data-width="width" :data-height="height" :class="className"><slot /></div>'
          },
          StTypography: { template: '<p><slot /></p>' }
        }
      }
    });

    expect(wrapper.find('[data-variant="surface-1"]').exists()).toBe(true);
    expect(wrapper.find('[data-width="full"]').exists()).toBe(true);
    expect(wrapper.find('[data-height="full"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="loading"]').exists()).toBe(true);
    expect(wrapper.find('p').exists()).toBe(false);
  });

  it('renderiza texto quando fornecido', () => {
    const wrapper = mount(StLoadingScreen, {
      props: { text: 'Carregando...' },
      global: {
        stubs: {
          StPaper: { template: '<div><slot /></div>' }
        }
      }
    });

    expect(wrapper.text()).toContain('Carregando...');
  });
});
