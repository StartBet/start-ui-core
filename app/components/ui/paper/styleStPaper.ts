import type {
  PaperBorder,
  PaperBorderRadius,
  PaperClassProps,
  PaperElevation,
  PaperVariant
} from '~/components/ui/paper/StPaper.interface';
import { sizeWidthClasses, sizeHeightClasses } from '~/types/Spacing';
import { spacingShorthandToClasses } from '~/utils/spacingShorthand';

const variantClasses: Record<PaperVariant, string> = {
  'surface-0': 'bg-surface-0',
  'surface-1': 'bg-surface-1',
  'surface-2': 'bg-surface-2',
  'surface-3': 'bg-surface-3',
  'surface-4': 'bg-surface-4',
  'surface-info': 'bg-surface-info',
  'surface-system': 'bg-surface-system',
  'surface-warning': 'bg-surface-warning',
  'surface-positive': 'bg-surface-positive',
  'surface-negative': 'bg-surface-negative',
  'surface-primary': 'bg-surface-primary',
  'surface-shadow-0': 'bg-surface-shadow-0',
  'surface-shadow-1': 'bg-surface-shadow-1',
  'surface-shadow-2': 'bg-surface-shadow-2',
  'surface-shadow-3': 'bg-surface-shadow-3'
};

const borderClasses: Record<PaperBorder, string> = {
  none: 'border-0',
  '1': 'border border-border-1',
  '2': 'border border-border-2',
  '3': 'border border-border-3',
  primary: 'border border-primary',
  secondary: 'border border-secondary',
  info: 'border border-content-info',
  system: 'border border-content-system',
  warning: 'border border-content-warning',
  positive: 'border border-content-positive',
  negative: 'border border-content-negative'
};

const borderRadiusClasses: Record<PaperBorderRadius, string> = {
  none: 'rounded-none',
  '1': 'rounded-ds-1',
  '2': 'rounded-ds-2'
};

const elevationClasses: Record<PaperElevation, string> = {
  0: 'shadow-paper-0',
  1: 'shadow-paper-1',
  2: 'shadow-paper-2',
  3: 'shadow-paper-3',
  4: 'shadow-paper-4'
};

const hoverElevationClasses: Record<Exclude<PaperElevation, 4>, string> = {
  0: 'hover:shadow-paper-1',
  1: 'hover:shadow-paper-2',
  2: 'hover:shadow-paper-3',
  3: 'hover:shadow-paper-4'
};

export function buildPaperStyle(props: Pick<PaperClassProps, 'bgImage'>) {
  const { bgImage } = props;

  if (!bgImage) return undefined;

  return {
    backgroundImage: `url(${bgImage})`
  } satisfies Record<string, string>;
}

export function buildPaperClasses(props: PaperClassProps) {
  const {
    variant = 'surface-1',
    border = 'none',
    borderRadius = '1',
    elevation = 1,
    interactive = false,
    bgImage,
    width,
    height,
    padding,
    paddingSm,
    paddingMd,
    paddingLg,
    margin,
    marginSm,
    marginMd,
    marginLg,
    className
  } = props;

  return [
    'relative block transition-all duration-200 ease-in-out',
    variantClasses[variant],
    borderClasses[border],
    borderRadiusClasses[borderRadius],
    elevationClasses[elevation],
    bgImage ? 'bg-cover bg-center bg-no-repeat' : undefined,
    interactive ? 'cursor-pointer active:translate-y-px' : undefined,
    interactive && elevation !== 4
      ? hoverElevationClasses[elevation]
      : undefined,
    width ? sizeWidthClasses[width] : undefined,
    height ? sizeHeightClasses[height] : undefined,
    ...spacingShorthandToClasses(padding, 'p'),
    ...spacingShorthandToClasses(paddingSm, 'p', 'sm'),
    ...spacingShorthandToClasses(paddingMd, 'p', 'md'),
    ...spacingShorthandToClasses(paddingLg, 'p', 'lg'),
    ...spacingShorthandToClasses(margin, 'm'),
    ...spacingShorthandToClasses(marginSm, 'm', 'sm'),
    ...spacingShorthandToClasses(marginMd, 'm', 'md'),
    ...spacingShorthandToClasses(marginLg, 'm', 'lg'),
    className
  ]
    .filter(Boolean)
    .join(' ');
}
