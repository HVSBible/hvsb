Outdated!

# Unit Test Security Rules

This sample pulled from https://github.com/firebase/quickstart-testing demonstrates how to write **unit tests** for security rules using the Firebase Emulator Suite.

## Setup

1. `npm install`
2. Make sure to have the [Firebase CLI](https://firebase.google.com/docs/cli) installed globally. `npm i -g firebase-tools`
3. Make sure to have Java installed, see https://java.com/en/download/help/download_options.xml

- Run `firebase init firestore` to pull down current rules for a Firebase project. If not using default project defined in .firebasesrc then run `firebase use PROJECTIDENTIER` beforehand.
- Consider installing toba.vsfire for Firestore Rules syntax highlighting

## Run Tests

_IMPORTANT: Any `firebase emulators` commands must be run in Windows Command Prompt or Powershell as Bash does not have access to Java._

To run the Cloud Firestore tests one time:
`firebase emulators:exec --only firestore "npm run test-firestore-rules"`

To run the Cloud Firestore tests in watch mode:
`firebase emulators:exec --only firestore "npm run test-firestore-rules:watch"`

Alternatively, to enjoy using the Firebase Emulator UI at the same time as testing you can run `firebase emulators:start --only firestore` and then run the desired testing command in another terminal `npm run test-firestore:watch`

## To view reports

1. $env:FIRESTORE_EMULATOR_HOST="localhost:8080"

## Create New Jest Test

1. Create a new \*.test.ts file and add `/// <reference types="jest" />` to the top of the file to avoid type errors.
2. To ensure everything is working, create a basic test like so:
   test('foo', () => {
   expect(true).toBe(true);
   })
3. Make changes to your \*.test.ts file and then run the appropriate testing command.

See https://jestjs.io/docs/en/getting-started and https://firebase.google.com/docs/firestore/security/test-rules-emulator for tips
