import type { GameProviderId } from '~/types/Game';
import type { PaperVariant } from '~/components/ui/paper/StPaper.interface';

export interface StCardGameProps {
  name: string;
  provider: GameProviderId;
  image: string;
  variant?: PaperVariant;
}
