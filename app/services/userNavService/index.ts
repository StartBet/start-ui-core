import type { UserNavItem } from '~/types/UserNav';

const normalizeTo = (to: string) => to.trim().replaceAll(/\s+/g, '-');
const withUserPrefix = (to: string) =>
  normalizeTo(`/user${to.startsWith('/') ? '' : '/'}${to}`);

const userNavItems: UserNavItem[] = [
  {
    id: 'account',
    label: 'Conta',
    ariaLabel: 'Conta',
    icon: 'user',
    to: withUserPrefix('/account/data'),
    children: [
      {
        id: 'data',
        label: 'Dados',
        ariaLabel: 'Dados',
        icon: 'user-pen',
        to: withUserPrefix('/account/data')
      },
      {
        id: 'document',
        label: 'Documento',
        ariaLabel: 'Documento',
        icon: 'id-card',
        to: withUserPrefix('/account/document')
      },
      {
        id: 'password',
        label: 'Senha',
        ariaLabel: 'Senha',
        icon: 'key',
        to: withUserPrefix('/account/password')
      }
    ]
  },
  {
    id: 'gamification',
    label: 'Gamificação',
    ariaLabel: 'Gamificação',
    icon: 'trophy',
    to: withUserPrefix('/gamification/general'),
    children: [
      {
        id: 'general',
        label: 'Geral',
        ariaLabel: 'Geral',
        icon: 'chart-line',
        to: withUserPrefix('/gamification/general')
      },
      {
        id: 'badges',
        label: 'Badges',
        ariaLabel: 'Badges',
        icon: 'medal',
        to: withUserPrefix('/gamification/badges')
      },
      {
        id: 'mini-games',
        label: 'Mini games',
        ariaLabel: 'Mini games',
        icon: 'gamepad',
        to: withUserPrefix('/gamification/mini-games')
      },
      {
        id: 'missions',
        label: 'Missões',
        ariaLabel: 'Missões',
        icon: 'bullseye',
        to: withUserPrefix('/gamification/missions')
      },
      {
        id: 'niveis',
        label: 'Níveis',
        ariaLabel: 'Níveis',
        icon: 'layer-group',
        to: withUserPrefix('/gamification/niveis')
      },
      {
        id: 'shop',
        label: 'Loja',
        ariaLabel: 'Loja',
        icon: 'cart-shopping',
        to: withUserPrefix('/gamification/shop')
      },
      {
        id: 'tournaments',
        label: 'Torneios',
        ariaLabel: 'Torneios',
        icon: 'trophy',
        to: withUserPrefix('/gamification/tournaments')
      }
    ]
  },
  {
    id: 'promotion',
    label: 'Promoção',
    ariaLabel: 'Promoção',
    icon: 'gift',
    to: withUserPrefix('/promotion/bonus'),
    children: [
      {
        id: 'bonus',
        label: 'Bônus',
        ariaLabel: 'Bônus',
        icon: 'gift',
        to: withUserPrefix('/promotion/bonus')
      },
      {
        id: 'coupon',
        label: 'Cupom',
        ariaLabel: 'Cupom',
        icon: 'ticket',
        to: withUserPrefix('/promotion/coupon')
      }
    ]
  },
  {
    id: 'protection',
    label: 'Proteção',
    ariaLabel: 'Proteção',
    icon: 'shield-halved',
    to: withUserPrefix('/protection/limit control'),
    children: [
      {
        id: 'limit-control',
        label: 'Controle de limite',
        ariaLabel: 'Controle de limite',
        icon: 'sliders',
        to: withUserPrefix('/protection/limit control')
      },
      {
        id: 'exclusion',
        label: 'Exclusão',
        ariaLabel: 'Exclusão',
        icon: 'user-slash',
        to: withUserPrefix('/protection/exclusion')
      },
      {
        id: 'suspension',
        label: 'Suspensão',
        ariaLabel: 'Suspensão',
        icon: 'ban',
        to: withUserPrefix('/protection/suspension')
      }
    ]
  },
  {
    id: 'wallet',
    label: 'Carteira',
    ariaLabel: 'Carteira',
    icon: 'wallet',
    to: withUserPrefix('/wallet/transaction'),
    children: [
      {
        id: 'transaction',
        label: 'Transações',
        ariaLabel: 'Transações',
        icon: 'money-bill-transfer',
        to: withUserPrefix('/wallet/transaction')
      },
      {
        id: 'annual-statement',
        label: 'Extrato anual',
        ariaLabel: 'Extrato anual',
        icon: 'file-invoice-dollar',
        to: withUserPrefix('/wallet/annual-statement')
      },
      {
        id: 'deposit',
        label: 'Depósito',
        ariaLabel: 'Depósito',
        icon: 'arrow-down',
        to: withUserPrefix('/wallet/deposit')
      },
      {
        id: 'withdraw',
        label: 'Saque',
        ariaLabel: 'Saque',
        icon: 'arrow-up',
        to: withUserPrefix('/wallet/withdraw')
      },
      {
        id: 'history',
        label: 'Histórico',
        ariaLabel: 'Histórico',
        icon: 'clock-rotate-left',
        to: withUserPrefix('/wallet/history')
      }
    ]
  }
];

export function useUserNavService() {
  return { items: userNavItems };
}
