// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  components: [{ path: '~/components', pathPrefix: false }],
  hooks: {
    'pages:extend'(pages) {
      pages.splice(0, pages.length);
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
        }
      );
    }
  }
});
