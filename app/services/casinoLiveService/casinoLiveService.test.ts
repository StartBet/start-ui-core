import { describe, expect, it } from 'vitest';

import {
  casinoLiveProviders,
  useCasinoLiveService
} from '~/services/casinoLiveService';

describe('useCasinoLiveService', () => {
  it('expõe uma lista estável de jogos com ids únicos e provider válido', () => {
    const { games, providers } = useCasinoLiveService();

    expect(Array.isArray(games)).toBe(true);
    expect(games.length).toBeGreaterThan(0);

    expect(Array.isArray(providers)).toBe(true);
    expect(providers.length).toBeGreaterThan(0);

    const providerIds = new Set(casinoLiveProviders.map((p) => p.id));

    const ids = new Set<string>();
    for (const game of games) {
      expect(game.id).toBeTruthy();
      expect(ids.has(game.id)).toBe(false);
      ids.add(game.id);

      expect(game.name).toBeTruthy();
      expect(game.description).toBeTruthy();
      expect(game.image).toMatch(/\.png$/i);
      expect(providerIds.has(game.provider)).toBe(true);
      expect(typeof game.latestEarnings).toBe('number');
      expect(game.latestEarnings).toBeGreaterThanOrEqual(20000);
      expect(game.latestEarnings).toBeLessThanOrEqual(50000);
    }
  });
});
