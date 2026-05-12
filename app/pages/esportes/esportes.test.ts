import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Esportes from './esportes.vue';

// Mocks
vi.mock('nuxt/app', () => ({
  useHead: vi.fn()
}));

describe('Esportes Page', () => {
  it('renders correctly', () => {
    const wrapper = mount(Esportes);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('iframe').exists()).toBe(true);
  });
});
