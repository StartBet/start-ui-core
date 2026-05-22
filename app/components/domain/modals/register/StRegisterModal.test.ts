import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('~/components/ui/modal/StModal.vue', () => ({
  default: {
    props: ['open'],
    template: '<div v-if="open"><slot /></div>'
  }
}));

vi.mock('~/components/ui/form/input/StInput.vue', () => ({
  default: {
    props: ['type', 'name', 'placeholder'],
    template: '<input :type="type" :name="name" :placeholder="placeholder" />'
  }
}));

vi.mock('~/components/ui/typography/StTypography.vue', () => ({
  default: { template: '<p><slot /></p>' }
}));

vi.mock('~/components/ui/buttom/button/StButton.vue', () => ({
  default: { template: '<button v-bind="$attrs"><slot /></button>' }
}));

vi.mock('~/components/ui/illustration/StIllustration.vue', () => ({
  default: {
    props: ['name', 'alt'],
    template: '<img :data-name="name" :alt="alt" />'
  }
}));

vi.mock('~/services/themeService', () => ({
  useThemeService: () => ({ theme: { value: 'dark' } })
}));

import StRegisterModal from './StRegisterModal.vue';

describe('StRegisterModal', () => {
  it('não renderiza conteúdo quando open=false', () => {
    const wrapper = mount(StRegisterModal, {
      props: { open: false }
    });

    expect(wrapper.text()).not.toContain('Cadastrar');
  });

  it('renderiza quando open=true e fecha ao clicar em Cadastrar', async () => {
    const wrapper = mount(StRegisterModal, {
      props: { open: true }
    });

    expect(wrapper.text()).toContain('Cadastrar');
    expect(wrapper.find('input[name="cpf"]').exists()).toBe(true);
    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
    expect(wrapper.find('input[name="telefone"][type="tel"]').exists()).toBe(
      true
    );
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);

    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('update:open')?.[0]).toEqual([false]);
  });
});
