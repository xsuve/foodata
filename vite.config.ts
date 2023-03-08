import { defineConfig } from 'vite';
import path, { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    manifest: {
      name: 'Foodata',
      short_name: 'Foodata',
      start_url: '/',
      display: 'standalone',
      background_color: '#f3f4f6',
      scope: '/',
      theme_color: '#f3f4f6',
      icons: [
        {
          src: '/img/icons/512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/img/icons/192x192.png',
          sizes: '192x192',
          type: 'image/png'
        }
      ]
    }
  }), /*basicSsl()*/],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  }
})
