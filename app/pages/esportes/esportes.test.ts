import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('nuxt/app', () => ({
  useHead: vi.fn()
}));

import Esportes from './esportes.vue';

describe('Esportes Page', () => {
  it('renders correctly', () => {
    const wrapper = mount(Esportes);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('iframe').exists()).toBe(true);
  });
});
