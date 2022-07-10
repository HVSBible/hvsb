# [House Visual Study Bible](https://hvsb.app/)
A mobile-first Visual Bible Study web app built for Dr. H. Wayne House's study Bible.

## Packages

## Tech stack

[<img src="https://img.shields.io/badge/SvelteJS-3-orange.svg"></a>](https://svelte.dev/)
[<img src="https://img.shields.io/badge/SvelteKit-@next-orange.svg"></a>](https://kit.svelte.dev/)
[<img src="https://img.shields.io/badge/Windicss-3-blue.svg"></a>](https://windicss.org/)
[<img src="https://img.shields.io/badge/Firebase-9-orange.svg"></a>](https://firebase.google.com/)
[<img src="https://img.shields.io/badge/Vercel-SSR-black.svg"></a>](https://vercel.com/)
[<img src="https://img.shields.io/badge/Algolia-Instantsearch.js-blue.svg"></a>](https://www.algolia.com/)
[<img src="https://img.shields.io/badge/Vitest-yellow.svg"></a>](https://vitest.dev/)
[<img src="https://img.shields.io/badge/Iconify-blue.svg"></a>](https://icones.js.org/)

Firebase is used for:

- Authentication
- Cloud Firestore (database w/ caching and realtime updates)
- Storage
- Cloud Functions

## Contributing

Choose a planned task from the [HVSB Development Project Overview](https://github.com/orgs/HVSBible/projects/1) or [create an issue](https://github.com/HVSBible/hvsb/issues/new) to propose a new feature (please await discussion before creating a pull request). Read [Contributing](https://hvsb-parts.vercel.app/[0]docs/[0]contributing) to understand how to commit your changes using Git flow and then follow the instructions in _Developing_ to get started.

## Developing

- Install the recommended VSCode extensions (at least the first 6 [recommendations](.vscode/extensions.json)).
- Install [pnpm](https://pnpm.io/) globaly using `npm install -g pnpm` if you don't have it. 
- Install dependencies with `pnpm i` and then run `pnpm site` to start a dev server for the site or `pnpm parts` to start a dev server for the parts protoyping/documenting workbench depending on which you are working on. Each command will start up a Vite dev server which will give you a link to open on localhost. Changes will hot reload instantly (consider using auto-save if you want to), and you can have both dev servers simultaenously if applicable.
- Note that you can run needed `dev`, `build`, and `test` commands from the project root. You can also instal packages from the root, e.g. `pnpm -F site add -D foo-package` will install `foo-package` as a devDependency of the `@hvsb/site` package (`-F` is shorthand for `--filter`).

As an easy alternative you can use the Gitpod button here to open a ready-built dev environment w/ pnpm dependencies already installed:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/HVSBible/hvsb)

\*_Note that on localhost you will not see the live (prod) site's data, but rather the data from the dev database, which allows us to develop and make changes freely without worrying about deleting or corrupting important data._

### Design Inspiration

The simple and clean look was inspired by https://github.com/ayndqy/notecards.

## Development Tools in Use

- Prettier for automatic code styling on save and commit (added automatically by `create-svelte`) - use the Prettier extension to activate on-save for all non-svelte files (otherwise this will only happen via the `prettier --write` cli command)
- ESLint for automatic linting to improve code quality on commit (added automatically by `create-svelte`)
- simple-git-hooks + lint-staged, Note: manually run `npx simple-git-hooks` every time the simple-git-hooks configuration in package.json is changed
- LighthouseCI
- Vitest and WallabyJS (coming) for unit and integration tests
- Playwright (TODO) and possibly Checkly for E2E tests
