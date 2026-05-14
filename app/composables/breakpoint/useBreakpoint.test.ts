import { mount } from '@vue/test-utils';
import { defineComponent, nextTick } from 'vue';
import { describe, expect, it } from 'vitest';

import { useBreakpoint } from '~/composables/breakpoint';

const setWidth = async (value: number) => {
  Object.defineProperty(globalThis.window, 'innerWidth', {
    value,
    configurable: true
  });
  globalThis.window.dispatchEvent(new Event('resize'));
  await nextTick();
};

describe('useBreakpoint', () => {
  it('retorna breakpoint atual baseado em window.innerWidth', async () => {
    await setWidth(500);

    const Comp = defineComponent({
      setup() {
        const { current, isReady, isSmUp, isMdUp, isLgUp } = useBreakpoint();
        return { current, isReady, isSmUp, isMdUp, isLgUp };
      },
      template:
        '<div :data-current="current" :data-ready="String(isReady)" :data-sm="String(isSmUp)" :data-md="String(isMdUp)" :data-lg="String(isLgUp)" />'
    });

    const wrapper = mount(Comp);
    await nextTick();

    expect(wrapper.attributes('data-ready')).toBe('true');
    expect(wrapper.attributes('data-current')).toBe('base');

    await setWidth(700);
    expect(wrapper.attributes('data-current')).toBe('sm');
    expect(wrapper.attributes('data-sm')).toBe('true');
    expect(wrapper.attributes('data-md')).toBe('false');

    await setWidth(900);
    expect(wrapper.attributes('data-current')).toBe('md');
    expect(wrapper.attributes('data-md')).toBe('true');
    expect(wrapper.attributes('data-lg')).toBe('false');

    await setWidth(1200);
    expect(wrapper.attributes('data-current')).toBe('lg');
    expect(wrapper.attributes('data-lg')).toBe('true');

    wrapper.unmount();
  });

  it('usa CSS vars --breakpoint-* quando definidas', async () => {
    document.documentElement.style.setProperty('--breakpoint-sm', '500px');
    document.documentElement.style.setProperty('--breakpoint-md', '900px');
    document.documentElement.style.setProperty('--breakpoint-lg', '1200px');

    await setWidth(850);

    const Comp = defineComponent({
      setup() {
        const { current } = useBreakpoint();
        return { current };
      },
      template: '<div :data-current="current" />'
    });

    const wrapper = mount(Comp);
    await nextTick();

    expect(wrapper.attributes('data-current')).toBe('sm');

    await setWidth(950);
    expect(wrapper.attributes('data-current')).toBe('md');

    wrapper.unmount();
  });
});
