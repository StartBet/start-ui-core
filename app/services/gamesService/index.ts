import type { Game, GameProvider, GameProviderId } from '~/types/Game';

export const gameProviders: GameProvider[] = [
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

const gameImageFiles = [
  '20_stars_ablaze.png',
  'balloon.png',
  'big_bass_bonanza_3_reeler.png',
  'big_bass_boxing_bonus_round.png',
  'big_bass_mission_fishin.png',
  'big_bass_reel_repeat.png',
  'big_bass_return_to_the_races.png',
  'big_bass_splash.png',
  'captain_s_bounty.png',
  'cash_mania.png',
  'congo_cash.png',
  'dead_man_s_riches.png',
  'dragon_hatch_2.png',
  'dreams_of_macau.png',
  'duck_hunters.png',
  'fire_portals.png',
  'football_x.png',
  'gates_of_olympus_dice.png',
  'gems_bonanza.png',
  'gemstones_gold.png',
  'gold_party.png',
  'honey_honey_honey.png',
  'joker_s_jewels.png',
  'jurassic_kingdom.png',
  'legend_of_perseus.png',
  'mahjong_ways.png',
  'mahjong_ways_2.png',
  'master_joker.png',
  'mega_dragon.png',
  'mineisland.png',
  'mines.png',
  'mining_rush.png',
  'mr_treasure_s_fortune.png',
  'o_vira_lata_caramelo.png',
  'penalty_shoot_out.png',
  'piggy_gold.png',
  'pizza_pizza_pizza.png',
  'plinko_plus.png',
  'plinko_plus_1.png',
  'plinko_x.png',
  'rabbit_garden.png',
  'resurrecting_riches.png',
  'roulette_x.png',
  'san_quentin_2_death_row.png',
  'skate_or_die.png',
  'snake_and_ladders_megadice.png',
  'speed_winner.png',
  'the_dog_house.png',
  'ultimate_striker.png',
  'ways_of_the_qilin.png',
  'werewolf_s_hunt.png',
  'wild_cash_x9990.png',
  'wild_hop_drop.png',
  'wild_west_duels.png',
  'wild_west_gold.png',
  'wings_of_iguazu.png',
  'wisdom_of_athena.png',
  'zombie_outbreak.png'
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
  const len = gameProviders.length;
  if (len === 0) return fallback;

  const item = gameProviders[index % len];
  if (!item) return fallback;
  return item.id;
};

const buildDescription = (name: string, provider: GameProviderId) => {
  const providerName =
    gameProviders.find((p) => p.id === provider)?.name ?? provider;
  return `Jogue ${name}. Provedor: ${providerName}.`;
};

const games: Game[] = gameImageFiles.map((image, index) => {
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

export function useGamesService() {
  return { games, providers: gameProviders };
}
