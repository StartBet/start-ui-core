import type { IllustrationName } from '~/components/ui/illustration/illustrations';

export interface StCardActionGameProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  to?: string;
  target?: string;
  illustration?: IllustrationName;
}
