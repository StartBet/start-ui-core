// https://nuxt.com/docs/api/configuration/nuxt-config
import type { NuxtPage } from '@nuxt/schema';

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
      function removePagesMatching(
        pattern: RegExp,
        pagesToCheck: NuxtPage[] = []
      ) {
        const pagesToRemove: NuxtPage[] = [];

        for (const page of pagesToCheck) {
          if (page.file && pattern.test(page.file)) {
            pagesToRemove.push(page);
          } else {
            removePagesMatching(pattern, page.children);
          }
        }

        for (const page of pagesToRemove) {
          pagesToCheck.splice(pagesToCheck.indexOf(page), 1);
        }
      }

      removePagesMatching(/\.interface\.ts$/, pages);
    }
  }
});
