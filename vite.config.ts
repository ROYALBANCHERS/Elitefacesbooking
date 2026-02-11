import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // For Vercel: always use '/', for GitHub Pages use '/Elitefacesbooking/'
    base: '/',

    plugins: [react()],

    define: {
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY || ''),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY || ''),
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
      },
    },

    build: {
      // Increase chunk size warning limit
      chunkSizeWarningLimit: 700,
      // Manual chunks for better code splitting
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'ai-vendor': ['@google/genai'],
          },
        },
      },
    },
  };
});
