import type {
  StLoadingSize,
  StLoadingType,
  StLoadingVariant
} from './StLoading.interface';

export const buildStLoadingClasses = (props: {
  type?: StLoadingType;
  variant?: StLoadingVariant;
  size?: StLoadingSize;
  className?: string;
}) => {
  const { type = 'arrow', variant = 'primary', size = '8', className } = props;

  const sizeBySize: Record<StLoadingSize, string> = {
    '3': 'h-ds-3 w-ds-3',
    '4': 'h-ds-4 w-ds-4',
    '6': 'h-ds-6 w-ds-6',
    '8': 'h-ds-8 w-ds-8'
  };

  const arrow = [
    'absolute inset-0 m-auto',
    type === 'arrow'
      ? 'animate-loading-arrow drop-shadow-[-2px_2px_0px_var(--shadow-scale-800)]'
      : undefined,
    'z-[2]'
  ]
    .filter(Boolean)
    .join(' ');

  const s10 = [
    'animate-spinner-infinite',
    'aspect-square rounded-full border-[2px] border-solid border-[var(--brand-primary-100)]',
    'drop-shadow-[0px_0px_4px_var(--light-scale-950)]'
  ]
    .filter(Boolean)
    .join(' ');

  const spinner = [
    'absolute inset-1 m-auto',
    type === 'spinner' ? s10 : undefined,
    'z-[2]'
  ]
    .filter(Boolean)
    .join(' ');

  const cyclical = [
    'absolute inset-1',
    '-rotate-90',
    'drop-shadow-[0px_0px_4px_var(--light-scale-950)]',
    'z-[2]'
  ]
    .filter(Boolean)
    .join(' ');

  const bgByVariant: Record<StLoadingVariant, string> = {
    primary: 'bg-st-brand-primary-600',
    secondary: 'bg-st-brand-secondary-500',
    tertiary: 'bg-st-brand-primary-700'
  };

  const content = [
    'relative rounded-full overflow-hidden',
    bgByVariant[variant],
    sizeBySize[size],
    'before:absolute before:inset-0 before:rounded-full before:z-[1] before:mix-blend-luminosity',
    'before:bg-[linear-gradient(225deg,_var(--shadow-scale-800)_0%,_var(--light-scale-800)__100%)]',
    'after:absolute after:inset-[4px] after:rounded-full after:z-[3] after:mix-blend-plus-lighter',
    'after:bg-[linear-gradient(225deg,_var(--light-scale-800)_0%,_transparent_75%)]',
    className
  ]
    .filter(Boolean)
    .join(' ');
  return { spinner, cyclical, content, arrow, className };
};
