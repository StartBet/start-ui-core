import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('nuxt/app', () => ({
  useHead: vi.fn()
}));

import Promocoes from './promocoes.vue';

describe('Promoções Page', () => {
  it('renders correctly', () => {
    const wrapper = mount(Promocoes);
    expect(wrapper.exists()).toBe(true);
  });
});
