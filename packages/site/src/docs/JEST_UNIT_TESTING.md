## Setup

After creating a new SvelteKit repo

- Install packages needed to run Jest in Typescript on Svelte components `npm i -D jest ts-jest @types/jest @testing-library/svelte @testing-library/jest-dom svelte-jester`
- The Jest config needs to have a .cjs ending (jest.config.cjs) with SvelteKit's default `type: module` attribution in the package.json as jest can no longer find the jest.config.js file.

## Component testing

Add to the top of ts unit tests:

/\*\*

- @jest-environment node
  \*/

## Jest + module type (ESM) + svelte-preprocessor temporary hack

Until Jest 27.0.0 is released (see https://github.com/mihar-22/svelte-jester/issues/6 and https://github.com/mihar-22/svelte-jester/issues/25)

### References:

- https://github.com/kentcdodds/jest-cypress-react-babel-webpack/tree/tjs/jest-23
- https://daveceddia.com/svelte-typescript-jest/
- https://testing-library.com/docs/svelte-testing-library/setup
- https://github.com/testing-library/jest-dom (for Custom DOM matchers)

## If needing to modify tsconfig options for the tests

- create a tsconfig.spec.json file that `"extends": "./tsconfig.json"`
- add the adjusted `compilerOptions`
- exclude the app files
- include the test files
- edit the root tsconfig.json to exclude test files
