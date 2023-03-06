import { defineConfig } from 'vite';
import path, { resolve } from 'path';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), /*basicSsl()*/],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  }
})
