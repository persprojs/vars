import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

console.log('Environment Variables:', process.env);

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 5173,
    historyApiFallback: true,
  },
});


