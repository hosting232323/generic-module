import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';


// Riusa alias e plugin di vite (compreso vuetify) cosi' i test vedono i moduli
// esattamente come le app che importano generic-module.
export default mergeConfig(viteConfig, defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.spec.js'],
    setupFiles: ['tests/setup.js'],
    server: {
      // I componenti vuetify importano i loro .css: senza inline vite non li
      // trasforma e node non sa che farsene.
      deps: { inline: ['vuetify'] }
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'cobertura'],
      include: ['src/**/*.{js,vue}'],
      exclude: [
        // Solo re-export, nessuna logica da coprire.
        'src/index.js'
      ],
      // Le soglie valgono sui livelli che la suite copre davvero. I componenti
      // restano da coprire, quindi per ora nessuna soglia su src/components.
      thresholds: {
        'src/{stores,utils}/**': { statements: 90, branches: 90, functions: 90, lines: 90 }
      }
    }
  }
}));
