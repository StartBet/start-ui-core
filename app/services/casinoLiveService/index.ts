import type { Game, GameProvider, GameProviderId } from '~/types/Game';

export const casinoLiveProviders: GameProvider[] = [
  { id: 'endorphina', name: 'Endorphina' },
  { id: 'evolution-gaming', name: 'Evolution Gaming' },
  { id: 'evoplay', name: 'Evoplay' },
  { id: 'pg-soft', name: 'PG Soft' },
  { id: 'pragmatic-play', name: 'Pragmatic Play' },
  { id: 'slotopia', name: 'Slotopia' },
  { id: 'smartsoft-gaming', name: 'Smartsoft Gaming' },
  { id: 'spribe', name: 'Spribe' },
  { id: 'wazdan', name: 'Wazdan' }
];

const casinoLiveImageFiles = [
  'azure_roulette.png',
  'bac_boo.png',
  'crazy_time.png',
  'dragon_tiger.png',
  'football_studio.png',
  'immersive_roulette.png',
  'immersive_roulette_1.png',
  'infinity_blackjack.png',
  'mega_fire_blaze_roullete.png',
  'mega_fire_blaze_roullete_1.png',
  'mega_sic_bac.png',
  'red_door_roulette.png',
  'red_door_roulette_1.png',
  'roleta_brasileira.png',
  'roleta_canarinho.png',
  'roulette.png',
  'roullete_green.png',
  'speed_baccarat_a.png',
  'xxxtreme_lightning_roulette.png'
];

const stripExtension = (fileName: string) =>
  fileName.replace(/\.[a-z0-9]+$/i, '');

const titleizeFromSnake = (value: string) => {
  const words = value.split('_').filter(Boolean);
  return words
    .map((w) => {
      if (/^\d+$/.test(w)) return w;
      return w.slice(0, 1).toUpperCase() + w.slice(1);
    })
    .join(' ');
};

const toGameId = (fileName: string) => stripExtension(fileName);

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = Math.trunc(hash * 31 + (value.codePointAt(i) ?? 0));
  }
  return hash >>> 0;
};

const pickLatestEarnings = (seed: string) => {
  const min = 20000;
  const max = 50000;
  const range = max - min + 1;
  return min + (hashString(seed) % range);
};

const pickProvider = (index: number): GameProviderId => {
  const fallback: GameProviderId = 'endorphina';
  const len = casinoLiveProviders.length;
  if (len === 0) return fallback;

  const item = casinoLiveProviders[index % len];
  return item?.id ?? fallback;
};

const buildDescription = (name: string, provider: GameProviderId) => {
  const providerName =
    casinoLiveProviders.find((p) => p.id === provider)?.name ?? provider;
  return `Cassino ao vivo: ${name}. Provedor: ${providerName}.`;
};

const games: Game[] = casinoLiveImageFiles.map((image, index) => {
  const id = toGameId(image);
  const name = titleizeFromSnake(id);
  const provider = pickProvider(index);

  return {
    id,
    name,
    description: buildDescription(name, provider),
    latestEarnings: pickLatestEarnings(`${id}:${provider}`),
    image,
    provider
  };
});

export function useCasinoLiveService() {
  return { games, providers: casinoLiveProviders };
}
