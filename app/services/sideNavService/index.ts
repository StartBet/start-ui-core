import type { StNavbarItem } from '~/components/domain/navbar/StNavbar.interface';

const sideNavItems: StNavbarItem[] = [
  {
    id: 'promocoes',
    label: 'Promoções',
    ariaLabel: 'Promoções',
    to: '/promocoes',
    icon: 'gift'
  },
  {
    id: 'esporte',
    label: 'Esporte',
    ariaLabel: 'Esporte',
    to: '/esportes',
    icon: 'futbol'
  },
  {
    id: 'cassino-ao-vivo',
    label: 'Cassino ao vivo',
    ariaLabel: 'Cassino ao vivo',
    to: '/cassino',
    icon: 'circle-play'
  },
  {
    id: 'crash-games',
    label: 'Crash Games',
    ariaLabel: 'Crash Games',
    to: '/cassino',
    icon: 'bomb'
  },
  {
    id: 'slots',
    label: 'Slots',
    ariaLabel: 'Slots',
    to: '/cassino',
    icon: 'coins'
  },
  {
    id: 'loja',
    label: 'Loja',
    ariaLabel: 'Loja',
    to: '/user/gamification/shop',
    icon: 'cart-shopping'
  },
  {
    id: 'missoes',
    label: 'Missões',
    ariaLabel: 'Missões',
    to: '/user/gamification/missions',
    icon: 'bullseye'
  },
  {
    id: 'minigames',
    label: 'Minigames',
    ariaLabel: 'Minigames',
    to: '/user/gamification/mini-games',
    icon: 'gamepad'
  },
  {
    id: 'torneios',
    label: 'Torneios',
    ariaLabel: 'Torneios',
    to: '/user/gamification/tournaments',
    icon: 'trophy'
  },
  {
    id: 'cassino',
    label: 'Cassino',
    ariaLabel: 'Cassino',
    icon: 'Dice',
    to: '/cassino',
    children: [
      {
        id: 'fortune-tiger',
        label: 'Fortune Tiger',
        ariaLabel: 'Fortune Tiger',
        to: '/cassino',
        icon: 'Paw'
      },
      { id: 'aviator', label: 'Aviator', ariaLabel: 'Aviator', icon: 'Plane' },
      {
        id: 'gates-of-olympus',
        label: 'Gates of Olympus',
        ariaLabel: 'Gates of Olympus',
        icon: 'bolt'
      },
      {
        id: 'fortune-rabbit',
        label: 'Fortune Rabbit',
        ariaLabel: 'Fortune Rabbit',
        to: '/cassino',
        icon: 'carrot'
      }
    ]
  },
  {
    id: 'esportes',
    label: 'Esportes',
    ariaLabel: 'Esportes',
    icon: 'Futbol',
    to: '/esportes',
    chip: { variant: 'secondary', label: 'AO VIVO' },
    children: [
      {
        id: 'br-a',
        label: 'Brasileirão série A',
        ariaLabel: 'Brasileirão série A',
        to: '/esportes',
        icon: 'trophy'
      },
      {
        id: 'br-b',
        label: 'Brasileirão série B',
        ariaLabel: 'Brasileirão série B',
        to: '/esportes',
        icon: 'trophy'
      },
      {
        id: 'premier',
        label: 'Premier League',
        ariaLabel: 'Premier League',
        to: '/esportes',
        icon: 'trophy'
      },
      {
        id: 'champions-league',
        label: 'Champions League',
        ariaLabel: 'Champions League',
        to: '/esportes',
        icon: 'star'
      },
      {
        id: 'basketball',
        label: 'Basquete',
        ariaLabel: 'Basquete',
        to: '/esportes',
        icon: 'basketball'
      },
      {
        id: 'tennis',
        label: 'Tênis',
        ariaLabel: 'Tênis',
        to: '/esportes',
        icon: 'trophy'
      },
      {
        id: 'voleiball',
        label: 'Vôlei',
        ariaLabel: 'Vôlei',
        to: '/esportes',
        icon: 'Futbol'
      }
    ]
  },
  {
    id: 'suporte',
    label: 'Suporte ao vivo',
    ariaLabel: 'Suporte ao vivo',
    icon: 'Headset'
  }
];

export function useSideNavService() {
  return { items: sideNavItems };
}
