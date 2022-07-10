# Test Firebase Functions

## Setup Jest Testing for Typescript Firebase Functions

1. Install Jest for Typescript: `npm i -D jest typescript`
2. Install typings: `npm i -D ts-jest @types/jest`
3. Create config file, `npx ts-jest config:init`
4. Add to package.json `"test": "jest"` and `"test:watch": "jest --watchAll"`

## Setup Firebase Functions Testing tools

1. Download the service account file from your Firebase project and save it to the functions directory as `service-account-dev.json` - don't commit this!
2. Install Firebase Functions Test: `npm i firebase-functions-test`
3. Setup test-config.ts as seen in tests/test-config.ts in this repo.

Read https://firebase.google.com/docs/functions/unit-testing to learn more
Some good testing examples also found in https://github.com/firebase/quickstart-nodejs

## Unit Testing of Functions using Jest

1. Create a new \*.test.ts file and add `/// <reference types="jest" />` to the top of the file to avoid type errors.
2. To ensure everything is working, create a basic test like so: `test('foo', () => { expect(true).toBe(true); })`
3. Make changes to your \*.test.ts file and then run `npm t`. Alternatively run `npm run test:watch` to actively run tests while developing.

See https://jestjs.io/docs/en/getting-started for tips

## Manually Test Functions Using the Firebase Shell

(This is not needed if you use Jest testing tools but it's good to know about.)

1. Create new function and make sure it's exported from index.ts
2. For anything beyond Firestore and Realtime Database we need to set GOOGLE_APPLICATION_CREDENTIALS
   In Powershell on Windows (VS Code)
   `$env:GOOGLE_APPLICATION_CREDENTIALS="C:\Apps\talking-dictionaries\functions\service-account-dev.json"`
   See https://cloud.google.com/docs/authentication/getting-started#auth-cloud-implicit-nodejs for Linux/MacOS
3. `npm run shell`
