import { defineConfig } from 'vitest/config';

// Do not merge vite.config.js. Its dependency crawl never finishes under
// Vitest. The forks pool also deadlocks on Node 25, so tests run in threads.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.test.js'],
    pool: 'threads',
    fileParallelism: false,
  },
});
