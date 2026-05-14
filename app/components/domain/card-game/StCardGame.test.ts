import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import StCardGame from './StCardGame.vue';

describe('StCardGame', () => {
  it('renderiza nome, provedor e imagem', () => {
    const wrapper = mount(StCardGame, {
      props: {
        name: 'Fortune Tiger',
        provider: 'pg-soft',
        image: '/assets/imgs/games/fortune_tiger.png'
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

    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('/assets/imgs/games/fortune_tiger.png');
    expect(img.attributes('alt')).toBe('Fortune Tiger');
  });
});
