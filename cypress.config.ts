import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '1izaix',
  chromeWebSecurity: false,
  env: {
    apiUrl: 'http://localhost:3002',
    VITE_API_URL: 'http://localhost:3002',
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
    baseUrl: 'http://localhost:3001',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
