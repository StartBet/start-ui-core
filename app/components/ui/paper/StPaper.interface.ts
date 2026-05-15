import type { SizeValue } from '~/types/Spacing';

export type PaperVariant =
  | 'surface-0'
  | 'surface-1'
  | 'surface-2'
  | 'surface-3'
  | 'surface-4'
  | 'surface-info'
  | 'surface-system'
  | 'surface-warning'
  | 'surface-positive'
  | 'surface-negative'
  | 'surface-primary';

export type PaperBorder =
  | 'none'
  | '1'
  | '2'
  | '3'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'system'
  | 'warning'
  | 'positive'
  | 'negative';

export type PaperBorderRadius = 'none' | '1' | '2';

export type PaperElevation = 0 | 1 | 2 | 3 | 4;

export type PaperBgScreen =
  | 'aviator'
  | 'fortune-rabbit'
  | 'fortune-tiger'
  | 'gates-of-olimpus'
  | 'soccer'
  | 'basketball';

export interface PaperClassProps {
  variant?: PaperVariant;
  border?: PaperBorder;
  borderRadius?: PaperBorderRadius;
  elevation?: PaperElevation;
  interactive?: boolean;
  bgScreen?: PaperBgScreen;
  width?: SizeValue;
  height?: SizeValue;
  padding?: string;
  paddingSm?: string;
  paddingMd?: string;
  paddingLg?: string;
  margin?: string;
  marginSm?: string;
  marginMd?: string;
  marginLg?: string;
  className?: string;
}
