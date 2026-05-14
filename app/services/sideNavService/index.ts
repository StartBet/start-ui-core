import type { StNavbarItem } from '~/components/domain/navbar/StNavbar.interface';

const sideNavItems: StNavbarItem[] = [
  {
    id: 'cassino',
    label: 'Cassino',
    ariaLabel: 'Cassino',
    icon: 'Dice',
    to: '/cassino',
    children: [
      {
        id: 'meus-favoritos',
        label: 'Meus favoritos',
        ariaLabel: 'Meus favoritos',
        to: '/cassino',
        icon: 'Star'
      },
      { id: 'slots', label: 'Slots', ariaLabel: 'Slots', icon: 'Coins' },
      {
        id: 'cassino-ao-vivo',
        label: 'Cassino ao vivo',
        ariaLabel: 'Cassino ao vivo',
        to: '/cassino',
        icon: 'Dice'
      },
      { id: 'aviator', label: 'Aviator', ariaLabel: 'Aviator', icon: 'Plane' },
      { id: 'bac-bo', label: 'Bac Bo', ariaLabel: 'Bac Bo', icon: 'Dice' },
      {
        id: 'fortune-tiger',
        label: 'Fortune Tiger',
        ariaLabel: 'Fortune Tiger',
        to: '/cassino',
        icon: 'Paw'
      },
      {
        id: 'football-studio',
        label: 'Football Studio',
        ariaLabel: 'Football Studio',
        to: '/cassino',
        icon: 'Futbol'
      },
      {
        id: 'promocoes',
        label: 'Promoções',
        ariaLabel: 'Promoções',
        to: '/cassino',
        icon: 'Gift'
      }
    ]
  },
  {
    id: 'esportes',
    label: 'Esportes',
    ariaLabel: 'Esportes',
    icon: 'Futbol',
    to: '/esportes',
    chip: { variant: 'secondary', label: 'VIVO' },
    children: [
      {
        id: 'esporte-ao-vivo',
        label: 'Esporte ao vivo',
        ariaLabel: 'Esporte ao vivo',
        to: '/esportes',
        icon: 'tower-broadcast'
      },
      {
        id: 'e-sports',
        label: 'E-Sports',
        ariaLabel: 'E-Sports',
        to: '/esportes',
        icon: 'gamepad'
      },
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
        id: 'fifa',
        label: 'FIFA',
        ariaLabel: 'FIFA',
        to: '/esportes',
        icon: 'trophy'
      },
      {
        id: 'football-studio',
        label: 'Football Studio',
        ariaLabel: 'Football Studio',
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
  },
  { id: 'promocoes', label: 'Promoções', ariaLabel: 'Promoções', icon: 'Gift' }
];

export function useSideNavService() {
  return { items: sideNavItems };
}
