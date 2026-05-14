import type { PaperVariant } from '~/components/ui/paper/StPaper.interface';
import type { GameProviderId } from '~/types/Game';
import { interactionsHoverPressed } from '~/utils/compositions';

const gradientFromByVariant: Record<PaperVariant, string> = {
  'surface-0': 'before:from-[--color-surface-0]',
  'surface-1': 'before:from-[--color-surface-1]',
  'surface-2': 'before:from-[--color-surface-2]',
  'surface-3': 'before:from-[--color-surface-3]',
  'surface-4': 'before:from-[--color-surface-4]',
  'surface-info': 'before:from-[--color-surface-info]',
  'surface-system': 'before:from-[--color-surface-system]',
  'surface-warning': 'before:from-[--color-surface-warning]',
  'surface-positive': 'before:from-[--color-surface-positive]',
  'surface-negative': 'before:from-[--color-surface-negative]',
  'surface-primary': 'before:from-[--color-surface-primary]'
};

export const buildStCardGameClasses = (variant: PaperVariant) => {
  const root = 'w-full';
  const paper = 'flex flex-col justify-end relative';
  const image =
    'w-full h-ds-24 object-cover absolute top-0 left-0 rounded-ds-2';
  const gradientFromClass =
    gradientFromByVariant[variant] ?? gradientFromByVariant['surface-3'];
  const content = [
    `flex flex-col relative`,
    `before:absolute before:bottom-full before:left-0 before:w-full before:h-ds-24`,
    `before:bg-gradient-to-t before:to-transparent`,
    gradientFromClass
  ]
    .filter(Boolean)
    .join(' ');

  const title =
    '[display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] overflow-hidden';
  const provider = 'text-content-ghost';

  const buttonAct = [
    `absolute inset-0 flex items-center justify-center`,
    `bg-[--color-shadow-3] rounded-ds-2 border border-[--color-content-secondary]`,
    `transition-all duration-100 ease-in-out`,
    `opacity-0 hover:opacity-100`,
    `focus-visible:opacity-100`,
    interactionsHoverPressed
  ]
    .filter(Boolean)
    .join(' ');

  return { root, paper, image, content, title, provider, buttonAct };
};

export const providerLabel: Record<GameProviderId, string> = {
  endorphina: 'Endorphina',
  'evolution-gaming': 'Evolution Gaming',
  evoplay: 'Evoplay',
  'pg-soft': 'PG Soft',
  'pragmatic-play': 'Pragmatic Play',
  slotopia: 'Slotopia',
  'smartsoft-gaming': 'Smartsoft Gaming',
  spribe: 'Spribe',
  wazdan: 'Wazdan'
};
