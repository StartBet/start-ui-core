import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Home from './home.vue';

// Mocks
vi.mock('nuxt/app', () => ({
  useHead: vi.fn()
}));

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
