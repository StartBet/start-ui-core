import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

const push = vi.fn();

vi.mock('vue-router', () => ({
  useRoute: () => ({ path: '/user/account/data' }),
  useRouter: () => ({ push })
}));

vi.mock('~/services/userNavService', () => ({
  useUserNavService: () => ({
    items: [
      {
        id: 'account',
        label: 'Conta',
        ariaLabel: 'Conta',
        icon: 'user',
        to: '/user/account/data',
        children: [
          {
            id: 'data',
            label: 'Dados',
            ariaLabel: 'Dados',
            icon: 'user-pen',
            to: '/user/account/data'
          }
        ]
      }
    ]
  })
}));

vi.mock('~/components/ui/icon/StIcon.vue', () => ({
  default: { template: '<span data-test="icon" />' }
}));

vi.mock('~/components/ui/list/unordered-list/StUnorderedList.vue', () => ({
  default: { template: '<ul><slot /></ul>' }
}));

vi.mock('~/components/ui/list/list-item/StListItem.vue', () => ({
  default: {
    props: ['onClick'],
    template:
      '<li><button type="button" @click="onClick && onClick($event)"><slot /></button></li>'
  }
}));

import StUserNav from './StUserNav.vue';

describe('StUserNav', () => {
  it('renderiza e navega ao clicar', async () => {
    const wrapper = mount(StUserNav);
    expect(wrapper.text()).toContain('Conta');
    expect(wrapper.text()).toContain('Dados');

    await wrapper.find('button').trigger('click');
    expect(push).toHaveBeenCalledWith('/user/account/data');
  });
});
