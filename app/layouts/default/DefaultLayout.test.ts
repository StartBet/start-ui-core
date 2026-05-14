import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('~/components/domain/header/StHeader.vue', () => ({
  default: { template: '<header data-test="header" />' }
}));

vi.mock('~/components/domain/navbar/StNavbar.vue', () => ({
  default: { template: '<nav data-test="navbar" />' }
}));

vi.mock('~/components/domain/footer/StFooter.vue', () => ({
  default: { template: '<footer data-test="footer" />' }
}));

import DefaultLayout from './DefaultLayout.vue';

describe('DefaultLayout', () => {
  it('renderiza header, navbar, footer e slot', () => {
    const wrapper = mount(DefaultLayout, {
      slots: { default: '<div data-test="slot" />' }
    });

    expect(wrapper.find('[data-test="header"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="navbar"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="footer"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="slot"]').exists()).toBe(true);
  });
});
