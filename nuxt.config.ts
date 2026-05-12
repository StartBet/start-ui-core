// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  components: [{ path: '~/components', pathPrefix: false }],
  hooks: {
    'pages:extend'(pages) {
      // Remove todas as páginas geradas automaticamente para evitar rotas duplicadas com a nova arquitetura
      pages.splice(0, pages.length);

      // Adiciona as páginas manualmente
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
        }
      );
    }
  }
});
