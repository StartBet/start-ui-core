import { flushPromises, mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getImageCache } from '~/components/ui/image/styleStImage';
import StImage from '~/components/ui/image/StImage.vue';

describe('StImage', () => {
  beforeEach(() => {
    getImageCache().clear();
  });

  it('converte src em data-image e aplica alt/width/height e $attrs', async () => {
    const fetchMock = vi.fn(async () => ({
      ok: true,
      blob: async () => new Blob(['abc'], { type: 'image/png' })
    }));

    const FileReaderMock = class {
      public result: string | null = null;
      public onload: null | (() => void) = null;
      public onerror: null | (() => void) = null;
      readAsDataURL() {
        this.result = 'data:image/png;base64,YWJj';
        this.onload?.();
      }
    };

    vi.stubGlobal('fetch', fetchMock);
    vi.stubGlobal('FileReader', FileReaderMock);

    const wrapper = mount(StImage, {
      props: {
        src: 'https://example.com/a.png',
        alt: 'A',
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
    expect(img.attributes('alt')).toBe('A');
    expect(img.attributes('width')).toBe('56');
    expect(img.attributes('height')).toBe('56');
    expect(img.attributes('loading')).toBe('lazy');
    expect(img.attributes('decoding')).toBe('async');
    expect(img.attributes('class')).toContain('x');
    expect(img.attributes('class')).toContain('y');

    const src = img.attributes('src');
    expect(src).toBe('data:image/png;base64,YWJj');
  });

  it('usa cache e não refaz fetch do mesmo src', async () => {
    const fetchMock = vi.fn(async () => ({
      ok: true,
      blob: async () => new Blob(['abc'], { type: 'image/png' })
    }));

    const FileReaderMock = class {
      public result: string | null = null;
      public onload: null | (() => void) = null;
      readAsDataURL() {
        this.result = 'data:image/png;base64,YWJj';
        this.onload?.();
      }
    };

    vi.stubGlobal('fetch', fetchMock);
    vi.stubGlobal('FileReader', FileReaderMock);

    const a = mount(StImage, {
      props: { src: 'https://example.com/a.png', alt: 'A' }
    });
    await flushPromises();
    await flushPromises();
    a.unmount();

    const b = mount(StImage, {
      props: { src: 'https://example.com/a.png', alt: 'B' }
    });
    await flushPromises();
    await flushPromises();
    b.unmount();

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('não renderiza img quando src é vazio ou fetch falha', async () => {
    const fetchMock = vi.fn(async () => ({
      ok: false,
      blob: async () => new Blob()
    }));
    vi.stubGlobal('fetch', fetchMock);

    const empty = mount(StImage, { props: { src: '', alt: 'X' } });
    await flushPromises();
    expect(empty.find('img').exists()).toBe(false);

    const fail = mount(StImage, {
      props: { src: 'https://example.com/x.png', alt: 'X' }
    });
    await flushPromises();
    await flushPromises();
    expect(fail.find('img').exists()).toBe(false);
  });
});
