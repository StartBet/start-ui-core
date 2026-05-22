import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('~/components/domain/modals/login/StLoginModal.vue', () => ({
  default: {
    props: ['open'],
    template: `<button data-test="login" @click="$emit('update:open', false)" />`
  }
}));

const storeMock = {
  active: 'login' as const,
  open: vi.fn(),
  close: vi.fn()
};

vi.mock('~/stores/modalStore', () => ({
  useModalStore: () => storeMock
}));

import StModalHost from './StModalHost.vue';

describe('StModalHost', () => {
  it('renderiza login quando active=login e fecha ao receber update:open=false', async () => {
    const wrapper = mount(StModalHost);

    expect(wrapper.find('[data-test="login"]').exists()).toBe(true);

    await wrapper.find('[data-test="login"]').trigger('click');
    expect(storeMock.close).toHaveBeenCalledTimes(1);
  });
});
