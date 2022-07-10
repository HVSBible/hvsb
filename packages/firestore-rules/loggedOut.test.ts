/// <reference types="jest" />

import { getAuthedFirestore, teardown, clearFirestore, loadRules } from './helpers';
import { assertFails } from '@firebase/testing';

beforeEach(async () => {
  await clearFirestore();
});

beforeAll(async () => {
  await loadRules();
});

afterAll(async () => {
  await teardown();
});

describe('Firestore rules', () => {
  test('fail to read random document when not authenticated', async () => {
    const db = await getAuthedFirestore(null);
    const docRef = db.collection('random').doc('123');
    expect(await assertFails(docRef.get()));
  });

  test('fail when trying to create a user without logging in', async () => {
    const db = await getAuthedFirestore(null);
    const userRef = db.collection('users').doc('my-user-123');
    expect(await assertFails(userRef.set({ uid: 'my-user-123' })));
  });
});
