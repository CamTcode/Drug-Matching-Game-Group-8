import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html', 'json-summary'],
        include: ['src/**/*.{ts,tsx}'],
        exclude: [
          'src/**/*.{test,spec}.{ts,tsx}',
          'src/main.tsx',
          'src/test/**',
          'src/**/*.d.ts',
        ],
      },
    },
  }),
);
