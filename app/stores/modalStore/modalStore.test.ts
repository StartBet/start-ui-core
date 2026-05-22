import { describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

import { useModalStore } from '~/stores/modalStore';

describe('modalStore', () => {
  it('open e close controlam active/isOpen', () => {
    setActivePinia(createPinia());
    const store = useModalStore();

    expect(store.isOpen).toBe(false);
    expect(store.active).toBe(null);

    store.open('login');
    expect(store.isOpen).toBe(true);
    expect(store.active).toBe('login');

    store.open('register');
    expect(store.isOpen).toBe(true);
    expect(store.active).toBe('register');

    store.close();
    expect(store.isOpen).toBe(false);
    expect(store.active).toBe(null);
  });
});
