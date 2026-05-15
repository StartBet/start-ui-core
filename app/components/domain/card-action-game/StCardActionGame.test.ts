import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import StCardActionGame from './StCardActionGame.vue';

describe('StCardActionGame', () => {
  it('renderiza o título e subtítulo corretamente', () => {
    const wrapper = mount(StCardActionGame, {
      props: {
        title: 'Fortune Tiger',
        subtitle: 'PG Soft',
        buttonText: 'Jogar',
        bgScreen: 'aviator'
      },
      global: {
        stubs: {
          StIllustration: true,
          StPaper: {
            props: ['bgScreen'],
            template: '<div :data-bg-screen="bgScreen"><slot /></div>'
          },
          StTypography: {
            template: '<span><slot /></span>'
          },
          StButton: {
            template: '<button><slot /></button>'
          }
        }
      }
    });

    expect(wrapper.text()).toContain('Fortune Tiger');
    expect(wrapper.text()).toContain('PG Soft');
    expect(wrapper.text()).toContain('Jogar');
    expect(wrapper.find('[data-bg-screen="aviator"]').exists()).toBe(true);
  });
});
