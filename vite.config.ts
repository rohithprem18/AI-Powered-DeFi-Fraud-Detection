import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import ghPages from 'vite-plugin-gh-pages'; // Not needed in plugins array

// https://vitejs.dev/config/
export default defineConfig({
  base: '/AI-Powered-DeFi-Fraud-Detection/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
