import { describe, expect, it } from 'vitest';

import { useSideNavService } from '~/services/sideNavService';

describe('useSideNavService', () => {
  it('expõe uma lista estável de itens com ids únicos', () => {
    const { items } = useSideNavService();

    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBeGreaterThan(0);

    const ids = new Set<string>();
    for (const item of items) {
      expect(item.id).toBeTruthy();
      expect(ids.has(item.id)).toBe(false);
      ids.add(item.id);
    }
  });

  it('itens com children devem ter children com ids únicos', () => {
    const { items } = useSideNavService();

    for (const item of items) {
      if (!item.children?.length) continue;

      const childIds = new Set<string>();
      for (const child of item.children) {
        expect(child.id).toBeTruthy();
        expect(childIds.has(child.id)).toBe(false);
        childIds.add(child.id);
      }
    }
  });
});
