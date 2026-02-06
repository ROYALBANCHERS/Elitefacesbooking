import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    // Agar Vercel par hai toh '/', agar GitHub Pages par toh '/Elitefacesbooking/'
    base: process.env.VERCEL ? '/' : '/Elitefacesbooking/',
    
    plugins: [react()],
    
    define: {
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY || ''),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY || ''),
    },
    
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
