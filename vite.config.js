import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1200,
    // No manualChunks. Splitting React apart from react-dom / react-router /
    // @react-three/fiber causes init-order errors (React namespace is undefined
    // when vendor libs reach for forwardRef / useLayoutEffect / Children at
    // module load). Let Vite/Rollup handle chunking automatically — three.js
    // still splits on its own via the dynamic import of HeroScene.
  },
});
