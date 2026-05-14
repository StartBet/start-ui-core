import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';

const mocked = vi.hoisted(() => ({
  isMdUp: null as unknown,
  isReady: null as unknown
}));

vi.mock('~/composables/breakpoint', async () => {
  const { ref } = await import('vue');

  const isMdUp = ref(true);
  const isReady = ref(false);

  mocked.isMdUp = isMdUp;
  mocked.isReady = isReady;

  return {
    useBreakpoint: () => ({ isMdUp, isReady })
  };
});

import { useSideNavStore } from '~/stores/sideNavStore';

describe('useSideNavStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    (mocked.isMdUp as any).value = true;
    (mocked.isReady as any).value = false;
  });

  it('inicializa aberto (SSR-safe) e mantém aberto quando desktop (md+)', () => {
    vi.useFakeTimers();

    const store = useSideNavStore();
    expect(store.isOpen).toBe(false);

    (mocked.isMdUp as any).value = true;
    (mocked.isReady as any).value = true;

    return nextTick().then(() => {
      vi.advanceTimersByTime(0);
      expect(store.isOpen).toBe(true);
      vi.useRealTimers();
    });
  });

  it('fecha automaticamente quando não é desktop', () => {
    vi.useFakeTimers();

    const store = useSideNavStore();
    expect(store.isOpen).toBe(false);

    (mocked.isMdUp as any).value = false;
    (mocked.isReady as any).value = true;

    return nextTick().then(() => {
      vi.advanceTimersByTime(0);
      expect(store.isOpen).toBe(false);
      vi.useRealTimers();
    });
  });

  it('open e close controlam isOpen', () => {
    const store = useSideNavStore();

    expect(store.isOpen).toBe(false);

    store.close();
    expect(store.isOpen).toBe(false);

    store.open();
    expect(store.isOpen).toBe(true);
  });

  it('toggle alterna isOpen', () => {
    const store = useSideNavStore();

    store.toggle();
    expect(store.isOpen).toBe(true);

    store.toggle();
    expect(store.isOpen).toBe(false);
  });
});
