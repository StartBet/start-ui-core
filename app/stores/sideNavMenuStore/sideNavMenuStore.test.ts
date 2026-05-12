import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

import { useSideNavMenuStore } from '~/stores/sideNavMenuStore';

describe('useSideNavMenuStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('por default considera um id como expandido (quando não existe entrada)', () => {
    const store = useSideNavMenuStore();
    expect(store.isExpanded('a')).toBe(true);
  });

  it('setExpanded define o estado de expansão por id', () => {
    const store = useSideNavMenuStore();

    store.setExpanded('a', false);
    expect(store.isExpanded('a')).toBe(false);

    store.setExpanded('a', true);
    expect(store.isExpanded('a')).toBe(true);
  });

  it('toggleExpanded alterna o estado', () => {
    const store = useSideNavMenuStore();

    store.toggleExpanded('a');
    expect(store.isExpanded('a')).toBe(false);

    store.toggleExpanded('a');
    expect(store.isExpanded('a')).toBe(true);
  });

  it('collapseAll limpa todos os estados', () => {
    const store = useSideNavMenuStore();

    store.setExpanded('a', false);
    store.setExpanded('b', true);

    store.collapseAll();

    expect(store.expandedById).toEqual({});
    expect(store.isExpanded('a')).toBe(true);
    expect(store.isExpanded('b')).toBe(true);
  });
});
