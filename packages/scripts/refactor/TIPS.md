# Firestore Refactor

Note that in the standalone repo, we ran `tsc` using a watch task and then did a one-time link of each needed script command by running `npm link` and placing `#!/usr/bin/env node` at the top of each file. Now we are moving towards using ts-node.

### OLD: To Compile Typescript files into Javascript after making changes

Run `tsc` (must have installed Typescript beforehand)
or press `Ctrl+Shift+B` and select `tsc: watch - tsconfig.json` to start the Typescript watcher
