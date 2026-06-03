// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  components: [{ path: '~/components', pathPrefix: false }],
  app: {
    teleportId: 'modal-root'
  },
  hooks: {
    'pages:extend'(pages) {
      pages.splice(0, pages.length);
      const userPages = [
        {
          name: 'user-account-data',
          path: '/user/account/data',
          file: '~/pages/user/account/data/'
        },
        {
          name: 'user-account-document',
          path: '/user/account/document',
          file: '~/pages/user/account/document/'
        },
        {
          name: 'user-account-password',
          path: '/user/account/password',
          file: '~/pages/user/account/password/'
        },
        {
          name: 'user-gamification-general',
          path: '/user/gamification/general',
          file: '~/pages/user/gamification/general/'
        },
        {
          name: 'user-gamification-badges',
          path: '/user/gamification/badges',
          file: '~/pages/user/gamification/badges/'
        },
        {
          name: 'user-gamification-mini-games',
          path: '/user/gamification/mini-games',
          file: '~/pages/user/gamification/mini-games/'
        },
        {
          name: 'user-gamification-missions',
          path: '/user/gamification/missions',
          file: '~/pages/user/gamification/missions/'
        },
        {
          name: 'user-gamification-niveis',
          path: '/user/gamification/niveis',
          file: '~/pages/user/gamification/niveis/'
        },
        {
          name: 'user-gamification-shop',
          path: '/user/gamification/shop',
          file: '~/pages/user/gamification/shop/'
        },
        {
          name: 'user-gamification-tournaments',
          path: '/user/gamification/tournaments',
          file: '~/pages/user/gamification/tournaments/'
        },
        {
          name: 'user-promotion-bonus',
          path: '/user/promotion/bonus',
          file: '~/pages/user/promotion/bonus/'
        },
        {
          name: 'user-promotion-coupon',
          path: '/user/promotion/coupon',
          file: '~/pages/user/promotion/coupon/'
        },
        {
          name: 'user-protection-limit-control',
          path: '/user/protection/limit-control',
          file: '~/pages/user/protection/limit-control/'
        },
        {
          name: 'user-protection-exclusion',
          path: '/user/protection/exclusion',
          file: '~/pages/user/protection/exclusion/'
        },
        {
          name: 'user-protection-suspension',
          path: '/user/protection/suspension',
          file: '~/pages/user/protection/suspension/'
        },
        {
          name: 'user-wallet-transaction',
          path: '/user/wallet/transaction',
          file: '~/pages/user/wallet/transaction/'
        },
        {
          name: 'user-wallet-annual-statement',
          path: '/user/wallet/annual-statement',
          file: '~/pages/user/wallet/annual-statement/'
        },
        {
          name: 'user-wallet-deposit',
          path: '/user/wallet/deposit',
          file: '~/pages/user/wallet/deposit/'
        },
        {
          name: 'user-wallet-withdraw',
          path: '/user/wallet/withdraw',
          file: '~/pages/user/wallet/withdraw/'
        },
        {
          name: 'user-wallet-history',
          path: '/user/wallet/history',
          file: '~/pages/user/wallet/history/'
        }
      ];

      pages.push(
        {
          name: 'home',
          path: '/',
          file: '~/pages/home/home.vue'
        },
        {
          name: 'cassino',
          path: '/cassino',
          file: '~/pages/cassino/cassino.vue'
        },
        {
          name: 'esportes',
          path: '/esportes',
          file: '~/pages/esportes/esportes.vue'
        },
        {
          name: 'promocoes',
          path: '/promocoes',
          file: '~/pages/promocoes/promocoes.vue'
        },
        ...userPages
      );
    }
  }
});
