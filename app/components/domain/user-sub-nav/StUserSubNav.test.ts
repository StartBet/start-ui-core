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
          },
          {
            id: 'document',
            label: 'Documento',
            ariaLabel: 'Documento',
            icon: 'id-card',
            to: '/user/account/document'
          }
        ]
      }
    ]
  })
}));

vi.mock('~/components/ui/paper/StPaper.vue', () => ({
  default: { template: '<div data-test="paper"><slot /></div>' }
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

import StUserSubNav from './StUserSubNav.vue';

describe('StUserSubNav', () => {
  it('renderiza filhos do grupo ativo e navega ao clicar', async () => {
    const wrapper = mount(StUserSubNav);
    expect(wrapper.find('[data-test="paper"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Dados');
    expect(wrapper.text()).toContain('Documento');

    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
    await buttons[1]?.trigger('click');
    expect(push).toHaveBeenCalledWith('/user/account/document');
  });
});
