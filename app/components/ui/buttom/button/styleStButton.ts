import type {
  ButtonClassProps,
  ButtonColor,
  ButtonSize,
  ButtonVariant
} from '~/components/ui/buttom/button/StButton.interface';
import { interactionsHoverPressed } from '~/utils/compositions';

const sizeClasses: Record<
  ButtonSize,
  { container: string; iconOnly: string; contentPadding: string }
> = {
  small: {
    container: 'h-8 text-ds-sm',
    iconOnly: 'w-8 px-0',
    contentPadding: 'px-ds-2'
  },
  medium: {
    container: 'h-10 text-ds-base',
    iconOnly: 'w-10 px-0',
    contentPadding: 'px-ds-2'
  },
  large: {
    container: 'h-12 text-ds-md',
    iconOnly: 'w-12 px-0',
    contentPadding: 'px-ds-2'
  }
};

const solidClasses: Record<ButtonColor, string> = {
  primary: 'bg-primary text-content-bright border border-transparent',
  secondary: 'bg-secondary text-brand border border-transparent',
  positive: 'bg-positive text-content-din border border-transparent',
  negative: 'bg-negative text-content-bright border border-transparent'
};

const outlineClasses: Record<ButtonColor, string> = {
  primary: 'bg-transparent text-content-primary border border-content-primary',
  secondary:
    'bg-transparent text-content-secondary border border-content-secondary',
  positive:
    'bg-transparent text-content-positive border border-content-positive',
  negative:
    'bg-transparent text-content-negative border border-content-negative'
};

const textClasses: Record<ButtonColor, string> = {
  primary: 'bg-transparent text-content-primary border border-transparent',
  secondary: 'bg-transparent text-content-secondary border border-transparent',
  positive: 'bg-transparent text-content-positive border border-transparent',
  negative: 'bg-transparent text-content-negative border border-transparent'
};

const variantClasses: Record<ButtonVariant, Record<ButtonColor, string>> = {
  solid: solidClasses,
  outline: outlineClasses,
  text: textClasses
};

export const buildButtonClasses = (
  props: ButtonClassProps & { isIconOnly?: boolean }
): { container: string; content: string } => {
  const {
    variant = 'solid',
    size = 'medium',
    color = 'primary',
    disabled = false,
    fullWidth = false,
    isIconOnly = false,
    className
  } = props;

  const base = [
    'relative inline-flex items-center rounded-ds-1 font-body font-semibold transition-all duration-200 ease-in-out disabled:cursor-not-allowed',
    isIconOnly ? 'justify-center' : 'justify-between',
    interactionsHoverPressed
  ]
    .filter(Boolean)
    .join(' ');

  const s = sizeClasses[size];

  const disabledClasses =
    'bg-surface-3 text-content-disable border border-border-2 cursor-not-allowed opacity-80';

  const container = [
    base,
    s.container,
    isIconOnly ? s.iconOnly : undefined,
    !isIconOnly && fullWidth ? 'w-full' : undefined,
    disabled ? disabledClasses : variantClasses[variant][color],
    className
  ]
    .filter(Boolean)
    .join(' ');

  const content = [
    'relative z-20 inline-flex items-center gap-ds-1',
    isIconOnly ? 'px-0' : s.contentPadding
  ]
    .filter(Boolean)
    .join(' ');

  return { container, content };
};
