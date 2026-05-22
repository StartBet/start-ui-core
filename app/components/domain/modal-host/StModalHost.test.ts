import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('~/components/domain/modals/login/StLoginModal.vue', () => ({
  default: {
    props: ['open'],
    template: `<button data-test="login" @click="$emit('update:open', false)" />`
  }
}));

vi.mock('~/components/domain/modals/register/StRegisterModal.vue', () => ({
  default: {
    props: ['open'],
    template: `<button data-test="register" @click="$emit('update:open', false)" />`
  }
}));

const storeMock = {
  active: 'login' as 'login' | 'register',
  open: vi.fn(),
  close: vi.fn()
};

vi.mock('~/stores/modalStore', () => ({
  useModalStore: () => storeMock
}));

import StModalHost from './StModalHost.vue';

describe('StModalHost', () => {
  it('renderiza login quando active=login e fecha ao receber update:open=false', async () => {
    storeMock.close.mockClear();
    storeMock.active = 'login';
    const wrapper = mount(StModalHost);

    expect(wrapper.find('[data-test="login"]').exists()).toBe(true);

    await wrapper.find('[data-test="login"]').trigger('click');
    expect(storeMock.close).toHaveBeenCalledTimes(1);
  });

  it('renderiza register quando active=register e fecha ao receber update:open=false', async () => {
    storeMock.close.mockClear();
    storeMock.active = 'register';
    const wrapper = mount(StModalHost);

    expect(wrapper.find('[data-test="register"]').exists()).toBe(true);

    await wrapper.find('[data-test="register"]').trigger('click');
    expect(storeMock.close).toHaveBeenCalledTimes(1);
  });
});
