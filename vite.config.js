import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  server: {
    port: 5173,
    open: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      css: {
        charset: false
      }
    }
  }
});