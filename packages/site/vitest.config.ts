import { defineProject, configDefaults } from 'vitest/config'
import path from 'node:path'

export default defineProject({
  test: {
    alias: {
      $lib: path.join(__dirname, './src/lib'),
    },
    name: 'site:unit',
    globals: true,
    includeSource: ['src/**/*.ts'],
    exclude: [...configDefaults.exclude, '**/tests/**'],
  },
})
