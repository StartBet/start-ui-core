import type {
  FontFamily,
  FontSize,
  FontWeight,
  LetterSpacing,
  LineHeight,
  TextAlign,
  TypographyClassProps,
  TypographyVariant
} from '~/components/ui/typography/StTypography.interface';

const variantClasses: Record<TypographyVariant, string> = {
  'heading-1': 'font-heading text-heading-1 text-shadow-ds-large italic',
  'heading-2': 'font-heading text-heading-2 text-shadow-ds-medium italic',
  'heading-3': 'font-heading text-heading-3 text-shadow-ds-small italic',
  'heading-4': 'font-heading text-heading-4 text-shadow-ds-small italic',
  'highlight-large': 'font-highlight text-highlight-large text-shadow-ds-small',
  'highlight-medium':
    'font-highlight text-highlight-medium text-shadow-ds-small',
  'body-large': 'font-body text-body-large',
  'body-medium': 'font-body text-body-medium',
  'body-small': 'font-body text-body-small',
  'hero-title': 'font-highlight text-shadow-ds-large italic'
};

const sizeClasses: Record<FontSize, string> = {
  1: 'text-ds-xs',
  2: 'text-ds-sm',
  3: 'text-ds-base',
  4: 'text-ds-md',
  5: 'text-ds-lg',
  6: 'text-ds-xl',
  7: 'text-ds-2xl',
  8: 'text-ds-3xl',
  9: 'text-ds-4xl',
  10: 'text-ds-5xl',
  11: 'text-ds-6xl',
  12: 'text-ds-7xl'
};

const weightClasses: Record<FontWeight, string> = {
  thin: 'font-thin',
  extralight: 'font-extralight',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black'
};

const familyClasses: Record<FontFamily, string> = {
  body: 'font-body',
  heading: 'font-heading',
  highlight: 'font-highlight',
  display: 'font-highlight'
};

const lineHeightClasses: Record<LineHeight, string> = {
  tight: 'leading-ds-tight',
  snug: 'leading-ds-snug',
  normal: 'leading-ds-normal',
  relaxed: 'leading-ds-relaxed',
  loose: 'leading-ds-loose'
};

const letterSpacingClasses: Record<LetterSpacing, string> = {
  tighter: 'tracking-ds-tight',
  tight: 'tracking-ds-tight',
  normal: 'tracking-ds-normal',
  wide: 'tracking-ds-wide',
  wider: 'tracking-ds-wider',
  widest: 'tracking-ds-wider'
};

const alignClasses: Record<TextAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify'
};

const clampClasses: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
  1: 'overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] [line-clamp:1]',
  2: 'overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [line-clamp:2]',
  3: 'overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] [line-clamp:3]',
  4: 'overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4] [line-clamp:4]',
  5: 'overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:5] [line-clamp:5]',
  6: 'overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:6] [line-clamp:6]'
};

const normalizeClamp = (
  value: number | undefined
): 1 | 2 | 3 | 4 | 5 | 6 | undefined => {
  if (!value) return undefined;
  if (value <= 1) return 1;
  if (value === 2) return 2;
  if (value === 3) return 3;
  if (value === 4) return 4;
  if (value === 5) return 5;
  return 6;
};

export const buildTypographyClasses = (props: TypographyClassProps) => {
  const {
    variant = 'body-medium',
    size,
    weight,
    family,
    lineHeight,
    letterSpacing,
    align,
    italic = false,
    underline = false,
    strikethrough = false,
    uppercase = false,
    lowercase = false,
    capitalize = false,
    truncate = false,
    maxLines,
    className
  } = props;

  const clamp = normalizeClamp(maxLines);

  const heroTitleEfectClasses = [
    'text-content-secondary relative pr-1',
    '[text-shadow:none]',
    'bg-[linear-gradient(140deg,transparent_45%,var(--bright-scale-700)_45%,var(--bright-scale-700)_65%,transparent_65%),linear-gradient(0deg,var(--color-content-secondary)_0%,var(--color-content-secondary)_100%)]',
    'bg-clip-text text-transparent',
    'drop-shadow-[-4px_4px_0px_var(--shadow-scale-950)]'
  ]
    .filter(Boolean)
    .join(' ');

  const base = [
    'm-0 p-0 text-content-default',
    variantClasses[variant],
    size ? sizeClasses[size] : undefined,
    weight ? weightClasses[weight] : undefined,
    family ? familyClasses[family] : undefined,
    lineHeight ? lineHeightClasses[lineHeight] : undefined,
    letterSpacing ? letterSpacingClasses[letterSpacing] : undefined,
    align ? alignClasses[align] : undefined,
    italic ? 'italic' : undefined,
    underline ? 'underline' : undefined,
    strikethrough ? 'line-through' : undefined,
    uppercase ? 'uppercase' : undefined,
    lowercase ? 'lowercase' : undefined,
    capitalize ? 'capitalize' : undefined,
    truncate ? 'truncate' : undefined,
    clamp ? clampClasses[clamp] : undefined,
    className
  ]
    .filter(Boolean)
    .join(' ');

  return {
    base,
    heroTitleEfectClasses
  };
};
