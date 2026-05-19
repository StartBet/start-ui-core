import type { StIconSize } from '~/components/ui/icon/StIcon.interface';

const sizeClasses: Record<StIconSize, string> = {
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
  11: 'text-heading-2',
  12: 'text-heading-1'
};

export const buildIconClasses = (props: {
  size?: StIconSize;
  className?: string;
}) => {
  const { size, className } = props;
  return [
    'inline-flex items-center justify-center leading-none shrink-0',
    size ? sizeClasses[size] : undefined,
    className
  ]
    .filter(Boolean)
    .join(' ');
};
