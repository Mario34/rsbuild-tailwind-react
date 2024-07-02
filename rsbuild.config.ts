import { pluginReact } from '@rsbuild/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from '@rsbuild/core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { parsed } = loadEnv();

export default defineConfig({
  source: {
    alias: {
      '@': path.join(__dirname, './src'),
      '@bc/hy-ui': path.join(__dirname, '../components/src'),
    },
  },
  plugins: [pluginReact()],
  server: {
    port: Number(parsed.PORT),
    historyApiFallback: true,
    proxy: {
      '/api': {
        changeOrigin: true,
        target: parsed.PROXY_TARGET,
      },
    },
  },
});
