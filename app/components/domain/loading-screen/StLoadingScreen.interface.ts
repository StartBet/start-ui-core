import type {
  StLoadingType,
  StLoadingValue,
  StLoadingVariant
} from '~/components/ui/loading/StLoading.interface';
import type { PaperVariant } from '~/components/ui/paper/StPaper.interface';

export interface StLoadingScreenProps {
  surface?: PaperVariant;
  type?: StLoadingType;
  variant?: StLoadingVariant;
  value?: StLoadingValue;
  text?: string;
  className?: string;
}
