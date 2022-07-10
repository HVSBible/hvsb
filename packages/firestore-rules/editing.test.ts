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
  test('dont allow writes to media, authors, about, photographers, subjects, locations, and intros', async () => {
    const uid = '1234';
    const db = await getAuthedFirestore({ uid });

    const text = 'The pyramids...';
    await assertFails(db.collection('media').doc('123').set({ text }));
    await assertFails(db.collection('authors').doc('123').set({ text }));
    await assertFails(db.collection('about').doc('123').set({ text }));
    await assertFails(db.collection('photographers').doc('123').set({ text }));
    await assertFails(db.collection('subjects').doc('123').set({ text }));
    await assertFails(db.collection('locations').doc('123').set({ text }));
    await assertFails(db.collection('authors').doc('intros').set({ text }));
  });

  test('allow admin to write to media, authors, about, photographers, subjects, locations, and intros', async () => {
    const uid = '1234';
    const db = await getAuthedFirestore({ uid });

    await getAdminFirestore()
      .doc('users/1234')
      .set({
        roles: {
          admin: 1,
        },
      });

    const text = 'The pyramids...';
    await assertSucceeds(db.collection('media').doc('123').set({ text }));
    await assertSucceeds(db.collection('authors').doc('123').set({ text }));
    await assertSucceeds(db.collection('about').doc('123').set({ text }));
    await assertSucceeds(db.collection('photographers').doc('123').set({ text }));
    await assertSucceeds(db.collection('subjects').doc('123').set({ text }));
    await assertSucceeds(db.collection('locations').doc('123').set({ text }));
    await assertSucceeds(db.collection('authors').doc('intros').set({ text }));
  });
});
