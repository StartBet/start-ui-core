import type { GameProviderId } from '~/types/Game';

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

export const buildStMiniCardGameClasses = (className?: string) => {
  const root = ['w-full flex items-center gap-ds-1', className]
    .filter(Boolean)
    .join(' ');

  const image = 'rounded-ds-1 object-cover shrink-0';
  const imageFallback = 'w-ds-20 h-ds-20 rounded-ds-2 bg-surface-3 shrink-0';

  const content = 'flex flex-col min-w-0';
  const name =
    'text-content-default [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] overflow-hidden';
  const provider =
    'text-content-ghost [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] overflow-hidden';
  const earnings = 'text-content-secondary';

  return { root, image, imageFallback, content, name, provider, earnings };
};
