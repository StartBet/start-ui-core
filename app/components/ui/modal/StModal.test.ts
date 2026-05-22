import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('~/components/ui/buttom/button/StButton.vue', () => ({
  default: {
    props: ['className'],
    template: '<button v-bind="$attrs" :class="className"><slot /></button>'
  }
}));

vi.mock('~/components/ui/paper/StPaper.vue', () => ({
  default: {
    props: [
      'variant',
      'border',
      'borderRadius',
      'elevation',
      'interactive',
      'bgImage',
      'width',
      'height',
      'padding',
      'paddingSm',
      'paddingMd',
      'paddingLg',
      'margin',
      'marginSm',
      'marginMd',
      'marginLg',
      'className'
    ],
    template:
      '<div data-test="paper" :data-variant="variant" :data-border="border" :data-radius="borderRadius" :data-elevation="elevation" :class="className"><slot /></div>'
  }
}));

import StModal from './StModal.vue';

describe('StModal', () => {
  it('não renderiza quando open=false', () => {
    const wrapper = mount(StModal, {
      global: { stubs: { teleport: true } }
    });

    expect(wrapper.find('[data-test="paper"]').exists()).toBe(false);
  });

  it('renderiza quando open=true e aceita slot', () => {
    const wrapper = mount(StModal, {
      props: { open: true, variant: 'surface-2', elevation: 4, className: 'x' },
      slots: { default: '<div data-test="slot" />' },
      global: { stubs: { teleport: true } }
    });

    const paper = wrapper.find('[data-test="paper"]');
    expect(paper.exists()).toBe(true);
    expect(paper.attributes('data-variant')).toBe('surface-2');
    expect(paper.attributes('data-elevation')).toBe('4');
    expect(paper.classes()).toContain('x');
    expect(wrapper.find('[data-test="slot"]').exists()).toBe(true);
  });

  it('renderiza botão de fechar quando showCloseButton=true e emite update:open', async () => {
    const wrapper = mount(StModal, {
      props: { open: true, showCloseButton: true },
      global: { stubs: { teleport: true } }
    });

    await wrapper.find('button[aria-label="Fechar modal"]').trigger('click');

    expect(wrapper.emitted('update:open')?.[0]).toEqual([false]);
    expect(wrapper.emitted('close')?.length).toBe(1);
  });

  it('fecha ao clicar fora quando closeOnOutsideClick=true', async () => {
    const wrapper = mount(StModal, {
      props: { open: true, closeOnOutsideClick: true },
      global: { stubs: { teleport: true } }
    });

    await wrapper.find('[data-test="modal-overlay"]').trigger('click');
    expect(wrapper.emitted('update:open')?.[0]).toEqual([false]);
  });

  it('fecha ao pressionar Escape', async () => {
    const wrapper = mount(StModal, {
      props: { open: true },
      global: { stubs: { teleport: true } }
    });

    globalThis.window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape' })
    );
    expect(wrapper.emitted('update:open')?.[0]).toEqual([false]);
  });
});
