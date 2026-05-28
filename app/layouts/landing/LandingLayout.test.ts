import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import LandingLayout from './LandingLayout.vue';

describe('LandingLayout', () => {
  it('renderiza slot e aplica fundo padrão', () => {
    const wrapper = mount(LandingLayout, {
      slots: { default: '<div data-test="slot" />' }
    });

    expect(wrapper.find('[data-test="slot"]').exists()).toBe(true);
    expect(wrapper.attributes('class')).toContain('bg-surface-4');
  });
});
