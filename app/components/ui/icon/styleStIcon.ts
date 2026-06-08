import type { StIconSize } from '~/components/ui/icon/StIcon.interface';

const sizeClasses: Record<StIconSize, string> = {
  1: 'w-ds-xs h-ds-xs',
  2: 'w-ds-sm h-ds-sm',
  3: 'w-ds-base h-ds-base',
  4: 'w-ds-md h-ds-md',
  5: 'w-ds-lg h-ds-lg',
  6: 'w-ds-xl h-ds-xl',
  7: 'w-ds-2xl h-ds-2xl',
  8: 'w-ds-3xl h-ds-3xl',
  9: 'w-ds-4xl h-ds-4xl',
  10: 'w-ds-5xl h-ds-5xl',
  11: 'w-ds-6xl h-ds-6xl',
  12: 'w-ds-7xl h-ds-7xl'
};

export const buildIconClasses = (props: {
  size?: StIconSize;
  className?: string;
}) => {
  const { size, className } = props;

  const container = [
    'inline-flex items-center justify-center leading-none shrink-0 overflow-hidden',
    size ? sizeClasses[size] : 'w-ds-base h-ds-base',
    className
  ]
    .filter(Boolean)
    .join(' ');

  const glyph = ['block text-current', 'w-[80%] h-[80%]']
    .filter(Boolean)
    .join(' ');

  return { container, glyph };
};
