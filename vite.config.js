import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    vuetify({
      autoImport: true
    }),
    // Le funzioni pure (entry generic-module-utils) non hanno CSS proprio: lo
    // stile va iniettato solo nel bundle completo con i componenti Vuetify.
    cssInjectedByJsPlugin({
      jsAssetsFilterFunction: (chunk) => chunk.fileName === 'generic-module.es.js'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue']
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: {
        'generic-module': fileURLToPath(new URL('./src/index.js', import.meta.url)),
        'generic-module-utils': fileURLToPath(new URL('./src/utils-entry.js', import.meta.url))
      },
      name: 'generic-module',
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      formats: ['es']
    },
    rollupOptions: {
      external: [
        'vue',
        'vue-router',
        'pinia',
        /^vuetify/
      ]
    }
  }
})
