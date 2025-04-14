import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  preview: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: [
      'client-service', // Allowing requests from Kubernetes
      'posts.com', // Allowing requests from через Ingress
    ],
  },
});
