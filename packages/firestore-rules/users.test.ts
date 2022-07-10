/// <reference types="jest" />

import {
  getAuthedFirestore,
  getAdminFirestore,
  teardown,
  clearFirestore,
  loadRules,
} from './helpers';
import { assertFails, assertSucceeds } from '@firebase/testing';

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
  test('only let users create their own user document', async () => {
    const uid = '1234';
    const db = await getAuthedFirestore({ uid });

    const userRef = db.collection('users').doc(uid);
    expect(await assertSucceeds(userRef.set({ uid })));

    const notUserRef = db.collection('users').doc('someone-else');
    expect(await assertFails(notUserRef.set({ uid: 'someone-else' })));
  });

  test('allow users to update their user document with lastVisit', async () => {
    const uid = '123';
    const db = await getAuthedFirestore({ uid });

    await getAdminFirestore().doc('users/123').set({
      uid,
      displayName: 'Jacob',
    });

    expect(await assertSucceeds(db.doc(`users/${uid}`).update({ roles: 'something' })));
  });

  test('dont let users create own user document with stripe or subscription info', async () => {
    const uid = '1234';
    const db = await getAuthedFirestore({ uid });

    const userRef = db.collection('users').doc(uid);
    expect(await assertFails(userRef.set({ uid, stripeCustomerId: '1234' })));
    expect(await assertFails(userRef.set({ uid, subscriptions: { 'basic-monthly': 'active' } })));
    expect(await assertFails(userRef.set({ uid, roles: { admin: 1 } })));
  });

  test('only let users read their own document and not other user documents', async () => {
    const uid = '1234';
    const db = await getAuthedFirestore({ uid });

    expect(await assertSucceeds(db.doc(`users/${uid}`).get()));
    expect(await assertFails(db.collection('users').doc('someone-else').get()));
    expect(await assertFails(db.collection('users').get()));
  });

  test('only let users update their own document and not other user documents', async () => {
    const uid = '1234';
    const db = await getAuthedFirestore({ uid });

    await getAdminFirestore().doc('users/1234').set({
      uid: '1234',
    });
    // 'users/someone-else': {
    //   uid: 'someone-else',
    // },

    expect(await assertSucceeds(db.doc(`users/${uid}`).update({ email: 'me@aol.com' })));
    expect(
      await assertFails(db.collection('users').doc('someone-else').update({ email: 'me@aol.com' }))
    );
  });
});
