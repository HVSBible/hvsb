import { defineProject } from 'vitest/config';

export default defineProject({
  test: {
    name: 'scripts:unit',
    globals: true,
    includeSource: ['example/**/*.ts'],
  },
});
