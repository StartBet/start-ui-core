import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import StButton from '~/components/ui/buttom/button/StButton.vue';

describe('StButton', () => {
  const classList = (cls: string | undefined) =>
    (cls ?? '').trim().split(/\s+/).filter(Boolean);

  it('renderiza slot e aplica defaults', () => {
    const wrapper = mount(StButton, { slots: { default: 'Salvar' } });
    expect(wrapper.element.tagName.toLowerCase()).toBe('button');
    expect(wrapper.text()).toContain('Salvar');

    const list = classList(wrapper.attributes('class'));
    expect(list).toContain('focus:outline-none');
    expect(list).toContain('rounded-ds-1');
    expect(list).toContain('h-10');
    expect(list).toContain('bg-primary');
    expect(list).toContain('text-content-bright');
  });

  it('aplica variant outline + color secondary', () => {
    const wrapper = mount(StButton, {
      props: { variant: 'outline', color: 'secondary' }
    });
    const list = classList(wrapper.attributes('class'));
    expect(list).toContain('bg-transparent');
    expect(list).toContain('border-surface-secondary');
    expect(list).toContain('text-content-secondary');
  });

  it('aplica size small', () => {
    const wrapper = mount(StButton, {
      props: { size: 'small' },
      slots: { default: 'Ok' }
    });
    const list = classList(wrapper.attributes('class'));
    expect(list).toContain('h-8');
    expect(list).toContain('text-ds-sm');
  });

  it('entra em modo icon only quando não há slot e existe iconLeft', () => {
    const wrapper = mount(StButton, { props: { iconLeft: 'plus' } });
    const list = classList(wrapper.attributes('class'));
    expect(list).toContain('w-10');
    expect(list).toContain('px-0');

    const icon = wrapper.find('[aria-label="icon"]');
    expect(icon.exists()).toBe(true);
  });

  it('aplica disabled e sobrescreve estilos', () => {
    const wrapper = mount(StButton, {
      props: { disabled: true, variant: 'solid', color: 'negative' }
    });
    const list = classList(wrapper.attributes('class'));
    expect(list).toContain('bg-surface-3');
    expect(list).toContain('text-content-disable');
    expect(list).toContain('border-border-2');
    expect(wrapper.attributes('disabled')).toBeDefined();
  });

  it('aplica fullWidth', () => {
    const wrapper = mount(StButton, {
      props: { fullWidth: true },
      slots: { default: 'Continuar' }
    });
    const list = classList(wrapper.attributes('class'));
    expect(list).toContain('w-full');
  });
});
