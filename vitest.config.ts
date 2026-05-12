import vue from '@vitejs/plugin-vue';
import tsconfigPaths from 'vite-tsconfig-paths';
import { fileURLToPath } from 'node:url';
import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./app', import.meta.url)),
      '@': fileURLToPath(new URL('./app', import.meta.url))
    }
  },
  plugins: [
    tsconfigPaths({
      projects: ['./tsconfig.json'],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.vue']
    }),
    vue()
  ],
  test: {
    environment: 'happy-dom',
    include: ['app/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      exclude: [...coverageConfigDefaults.exclude, '.nuxt/**', '.output/**']
    }
  }
});
