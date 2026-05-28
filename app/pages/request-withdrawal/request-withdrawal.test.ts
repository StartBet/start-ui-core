import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { nextTick, ref } from 'vue';

vi.mock('~/services/themeService', () => ({
  useThemeService: () => ({ theme: ref<'dark' | 'light'>('dark') })
}));

vi.mock('~/components/ui/illustration/StIllustration.vue', () => ({
  default: { template: '<img />' }
}));

vi.mock('~/components/ui/typography/StTypography.vue', () => ({
  default: { template: '<p><slot /></p>' }
}));

vi.mock('~/components/ui/chip/StChip.vue', () => ({
  default: { template: '<span><slot /></span>' }
}));

vi.mock('~/components/ui/paper/StPaper.vue', () => ({
  default: { template: '<div><slot /></div>' }
}));

vi.mock('~/components/ui/buttom/button/StButton.vue', () => ({
  default: {
    props: {
      disabled: { type: Boolean, default: false }
    },
    emits: ['click'],
    template: `<button :disabled="disabled" @click="!disabled && $emit('click')"><slot /><slot name="endAdornment" /></button>`
  }
}));

import RequestWithdrawal from './request-withdrawal.vue';

describe('RequestWithdrawal Page', () => {
  it('renderiza', () => {
    const wrapper = mount(RequestWithdrawal);
    expect(wrapper.exists()).toBe(true);
  });

  it('chama openZendeskChat ao clicar no botão', async () => {
    const findSupportButton = (wrapper: ReturnType<typeof mount>) =>
      wrapper
        .findAll('button')
        .find((b) => b.text().includes('Falar com Atendimento'));

    const zE = vi.fn();
    (globalThis as unknown as { zE?: (...args: unknown[]) => void }).zE = zE;

    const previousScrollTo = globalThis.scrollTo;
    const scrollTo = vi.fn();
    (
      globalThis as unknown as { scrollTo?: (...args: unknown[]) => void }
    ).scrollTo = scrollTo;

    vi.useFakeTimers();
    const wrapper = mount(RequestWithdrawal);
    await nextTick();

    const initialButton = findSupportButton(wrapper);
    expect(initialButton).not.toBe(undefined);
    expect(initialButton?.attributes('disabled')).toBeDefined();

    await vi.runAllTimersAsync();
    await nextTick();

    const supportButton = findSupportButton(wrapper);
    expect(supportButton).not.toBe(undefined);
    expect(supportButton?.attributes('disabled')).toBeUndefined();
    await supportButton?.trigger('click');

    expect(zE).toHaveBeenCalledWith(
      'messenger:on',
      'close',
      expect.any(Function)
    );
    expect(zE).toHaveBeenCalledWith('messenger', 'show');
    expect(zE).toHaveBeenCalledWith('messenger', 'open');
    expect(scrollTo).toHaveBeenCalled();

    (globalThis as unknown as { scrollTo?: unknown }).scrollTo =
      previousScrollTo;
    (globalThis as unknown as { zE?: (...args: unknown[]) => void }).zE =
      undefined;
    vi.useRealTimers();
  });
});
