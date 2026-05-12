import type { StChipVariant } from '~/components/ui/chip/StChip.interface';

export type StNavbarChip = { variant: StChipVariant; label: string };

export type StNavbarChildItem = {
  id: string;
  label: string;
  ariaLabel: string;
  icon: string;
  to?: string;
};

export type StNavbarItem = StNavbarChildItem & {
  chip?: StNavbarChip;
  children?: StNavbarChildItem[];
};
