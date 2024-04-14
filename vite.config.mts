import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [react(), tsconfigPaths(), visualizer()],
  server: {
    host: '0.0.0.0',
    port: 3001,
  },
});
