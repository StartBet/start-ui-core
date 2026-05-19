import type { GameProviderId } from '~/types/Game';

export interface StMiniCardGameProps {
  name: string;
  provider: GameProviderId;
  image?: string;
  latestEarnings?: number;
  lastEarnings?: number;
  className?: string;
}
