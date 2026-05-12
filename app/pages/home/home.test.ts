import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('nuxt/app', () => ({
  useHead: vi.fn()
}));

import Home from './home.vue';

describe('Home Page', () => {
  it('renders correctly', () => {
    const wrapper = mount(Home, {
      global: {
        stubs: {
          StPaper: true,
          StTypography: true,
          StGrid: true,
          StCardActionGame: true
        }
      }
    });

    expect(wrapper.exists()).toBe(true);
  });
});
