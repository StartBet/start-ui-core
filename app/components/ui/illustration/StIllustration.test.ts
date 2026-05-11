import { mount, flushPromises } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getIllustrationCache } from '~/components/ui/illustration/styleStIllustration';

const { loader } = vi.hoisted(() => ({
  loader: vi.fn(
    async () => '<svg xmlns="http://www.w3.org/2000/svg"><rect /></svg>'
  )
}));

vi.mock('~/components/ui/illustration/illustrations', () => ({
  ILLUSTRATIONS: {
    'brand/brand-dark': loader
  }
}));

import StIllustration from '~/components/ui/illustration/StIllustration.vue';
import type { StIllustrationName } from '~/components/ui/illustration/StIllustration.interface';

describe('StIllustration', () => {
  beforeEach(() => {
    getIllustrationCache().clear();
    loader.mockClear();
  });

  it('renderiza img quando carrega e aplica alt/width/height e $attrs', async () => {
    const wrapper = mount(StIllustration, {
      props: {
        name: 'brand/brand-dark',
        alt: 'Brand',
        width: '56',
        height: '56',
        className: 'x'
      },
      attrs: {
        class: 'y',
        style: 'color: red;',
        loading: 'lazy',
        decoding: 'async'
      }
    });

    await flushPromises();
    await flushPromises();

    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('alt')).toBe('Brand');
    expect(img.attributes('width')).toBe('56');
    expect(img.attributes('height')).toBe('56');
    expect(img.attributes('loading')).toBe('lazy');
    expect(img.attributes('decoding')).toBe('async');

    expect(img.attributes('class')).toContain('x');
    expect(img.attributes('class')).toContain('y');
    expect(img.attributes('style')).toContain('color');

    const src = img.attributes('src');
    expect(src).toContain('data:image/svg+xml;charset=utf-8,');
    expect(src).toContain('%3Csvg');
  });

  it('usa cache e não recarrega o mesmo name', async () => {
    const a = mount(StIllustration, {
      props: { name: 'brand/brand-dark', alt: 'A' }
    });
    await flushPromises();
    await flushPromises();
    a.unmount();

    const b = mount(StIllustration, {
      props: { name: 'brand/brand-dark', alt: 'B' }
    });
    await flushPromises();
    await flushPromises();
    b.unmount();

    expect(loader).toHaveBeenCalledTimes(1);
  });

  it('não renderiza quando o name não existe no registry', async () => {
    const wrapper = mount(StIllustration, {
      props: { name: 'does-not-exist' as StIllustrationName, alt: 'X' }
    });

    await flushPromises();
    await flushPromises();

    expect(wrapper.find('img').exists()).toBe(false);
  });
});
