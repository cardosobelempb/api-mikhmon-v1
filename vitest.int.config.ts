// vitest.int.config.ts
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],

  test: {
    include: ['**/*.int-spec.ts'],
    environment: 'node',
    testTimeout: 30000,

    /**
     * Garante que os testes NÃO rodem em paralelo
     * Ideal para banco de dados e testes de integração
     */
    sequence: {
      concurrent: false,
    },

    clearMocks: true,
  },
})
