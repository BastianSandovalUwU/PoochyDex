import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'cl.poochydex.app',
  appName: 'poochydex',
  webDir: 'dist/poochydex',
  plugins: {
    // Route fetch/XHR through the native HTTP client so API calls bypass
    // WebView CORS restrictions (the app runs from the https://localhost origin).
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
