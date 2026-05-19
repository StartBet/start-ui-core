import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import StMiniCardGame from './StMiniCardGame.vue';

describe('StMiniCardGame', () => {
  it('renderiza imagem, nome, provider e latestEarnings em BRL', () => {
    const wrapper = mount(StMiniCardGame, {
      props: {
        name: 'Fortune Tiger',
        provider: 'pg-soft',
        image: '/assets/imgs/games/fortune_tiger.png',
        latestEarnings: 20000
      },
      global: {
        stubs: {
          StImage: {
            props: ['src', 'alt', 'className'],
            template: '<img :src="src" :alt="alt" />'
          },
          StPaper: { template: '<div><slot /></div>' },
          StTypography: { template: '<span><slot /></span>' }
        }
      }
    });

    expect(wrapper.text()).toContain('Fortune Tiger');
    expect(wrapper.text()).toContain('PG Soft');
    expect(wrapper.text()).toContain('R$ 20.000,00');

    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('/assets/imgs/games/fortune_tiger.png');
    expect(img.attributes('alt')).toBe('Fortune Tiger');
  });

  it('usa lastEarnings quando fornecido', () => {
    const wrapper = mount(StMiniCardGame, {
      props: {
        name: 'Aviator',
        provider: 'spribe',
        lastEarnings: 1234.5
      },
      global: {
        stubs: {
          StImage: true,
          StPaper: { template: '<div><slot /></div>' },
          StTypography: { template: '<span><slot /></span>' }
        }
      }
    });

    expect(wrapper.text()).toContain('R$ 1.234,50');
  });
});
