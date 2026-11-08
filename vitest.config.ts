import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/*.{test,spec}.{ts,tsx,js}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
      include: ['**/*.{ts,tsx,js}'],
      exclude: ['**/*.{test,spec}.{ts,tsx}'],
    },
  },
});
