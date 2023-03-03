/**
 * @vitest-environment happy-dom
 */

import { render } from '@testing-library/svelte';
import Hello from './Hello.svelte';

test('Hello world! displays by default', () => {
  const { container } = render(Hello);
  expect(container.innerHTML).toContain('Hello world!');
});

test('Hello Chris displays when Chris is passed in as a prop', () => {
  const { container } = render(Hello, { name: 'Chris' });
  expect(container.innerHTML).toContain('Hello Chris!');
});


// Further learning
// https://vitest.dev/guide/#examples
// https://www.eternaldev.com/blog/how-to-write-tests-in-sveltekit-and-vitest/
// https://testing-library.com/docs/svelte-testing-library/example/