import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Cassino from './cassino.vue';

// Mocks
vi.mock('nuxt/app', () => ({
  useHead: vi.fn()
}));

describe('Cassino Page', () => {
  it('renders correctly', () => {
    const wrapper = mount(Cassino, {
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
