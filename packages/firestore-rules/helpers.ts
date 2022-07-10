import * as firebase from '@firebase/testing';
import * as fs from 'fs';

/**
 * The emulator will accept any project ID for testing.
 */
const PROJECT_ID = `rules-spec-${Date.now()}`;

/**
 * Creates a new client FirebaseApp with authentication and returns the Firestore instance.
 */
export const getAuthedFirestore = (auth) => {
  return firebase.initializeTestApp({ projectId: PROJECT_ID, auth }).firestore();
};

/**
 * Creates a new admin FirebaseApp and returns the Firestore instance.
 */
export const getAdminFirestore = () => {
  return firebase.initializeAdminApp({ projectId: PROJECT_ID }).firestore();
};

export const loadRules = async () => {
  const rules = fs.readFileSync('firestore.rules', 'utf8');
  await firebase.loadFirestoreRules({ projectId: PROJECT_ID, rules });
};

export const clearFirestore = async () => {
  // Clear the database between tests
  await firebase.clearFirestoreData({ projectId: PROJECT_ID });
};

/**
 * The FIRESTORE_EMULATOR_HOST environment variable is set automatically
 * by "firebase emulators:exec"
 */
const COVERAGE_URL = `http://${process.env.FIRESTORE_EMULATOR_HOST}/emulator/v1/projects/${PROJECT_ID}:ruleCoverage.html`;

export const teardown = async () => {
  Promise.all(firebase.apps().map((app) => app.delete()));
  console.log(`View rule coverage information at ${COVERAGE_URL}\n`);
};
