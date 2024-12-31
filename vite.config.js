import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.js'),
      name: 'generic-module',
      fileName: (format) => `generic-module.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'crypto-js', 'vue-router'],
      output: {
        globals: {
          vue: 'Vue',
          'crypto-js': 'CryptoJS',
          'vue-router': 'VueRouter',
        },
      },
    },
  },
});
