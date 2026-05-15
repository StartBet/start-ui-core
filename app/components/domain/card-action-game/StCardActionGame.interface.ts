import type { IllustrationName } from '~/components/ui/illustration/illustrations';
import type { PaperBgScreen } from '~/components/ui/paper/StPaper.interface';

export interface StCardActionGameProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  to?: string;
  target?: string;
  illustration?: IllustrationName;
  bgScreen?: PaperBgScreen;
}
