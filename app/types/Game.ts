export type GameProviderId =
  | 'endorphina'
  | 'evolution-gaming'
  | 'evoplay'
  | 'pg-soft'
  | 'pragmatic-play'
  | 'slotopia'
  | 'smartsoft-gaming'
  | 'spribe'
  | 'wazdan';

export interface GameProvider {
  id: GameProviderId;
  name: string;
}

export interface Game {
  id: string;
  name: string;
  description?: string;
  latestEarnings?: number;
  image?: string;
  provider: GameProviderId;
}
