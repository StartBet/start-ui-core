import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

import { useSideNavStore } from '~/stores/sideNavStore';

describe('useSideNavStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('inicializa aberto', () => {
    const store = useSideNavStore();
    expect(store.isOpen).toBe(true);
  });

  it('open e close controlam isOpen', () => {
    const store = useSideNavStore();

    store.close();
    expect(store.isOpen).toBe(false);

    store.open();
    expect(store.isOpen).toBe(true);
  });

  it('toggle alterna isOpen', () => {
    const store = useSideNavStore();

    store.toggle();
    expect(store.isOpen).toBe(false);

    store.toggle();
    expect(store.isOpen).toBe(true);
  });
});
