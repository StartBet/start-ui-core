import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('~/components/ui/illustration/StIllustration.vue', () => ({
  default: {
    props: ['name', 'alt'],
    template: '<img :data-name="name" :alt="alt" v-bind="$attrs" />'
  }
}));

import StLoading from './StLoading.vue';

describe('StLoading', () => {
  it('renderiza (default: primary)', () => {
    const wrapper = mount(StLoading);
    expect(wrapper.element.tagName.toLowerCase()).toBe('span');
    expect(wrapper.find('img').attributes('data-name')).toBe(
      'brand/icon-arrow-1'
    );
  });

  it('renderiza variant=secondary', () => {
    const wrapper = mount(StLoading, {
      props: { variant: 'secondary' }
    });
    expect(wrapper.find('img').attributes('data-name')).toBe(
      'brand/icon-arrow-2'
    );
  });

  it('renderiza variant=tertiary', () => {
    const wrapper = mount(StLoading, {
      props: { variant: 'tertiary' }
    });
    expect(wrapper.find('img').attributes('data-name')).toBe(
      'brand/icon-arrow-3'
    );
  });

  it('renderiza spinner', () => {
    const wrapper = mount(StLoading, {
      props: { type: 'spinner', size: '3' }
    });
    expect(wrapper.find('img').exists()).toBe(false);
    expect(wrapper.find('.animate-spinner-infinite').exists()).toBe(true);
  });

  it('renderiza cyclical e atualiza com value', async () => {
    const wrapper = mount(StLoading, {
      props: { type: 'cyclical', value: 50 }
    });

    const circle = wrapper.find('circle');
    expect(circle.exists()).toBe(true);

    const circumference = 2 * Math.PI * 46;
    const offset50 = Number(circle.attributes('stroke-dashoffset'));
    expect(offset50).toBeCloseTo(circumference * 0.5, 3);

    await wrapper.setProps({ value: 100 });
    const offset100 = Number(
      wrapper.find('circle').attributes('stroke-dashoffset')
    );
    expect(offset100).toBeCloseTo(0, 3);
  });

  it('aplica size no container', () => {
    const wrapper = mount(StLoading, {
      props: { size: '3' }
    });
    expect(wrapper.classes()).toContain('h-ds-3');
    expect(wrapper.classes()).toContain('w-ds-3');
  });
});
