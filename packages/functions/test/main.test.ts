/// <reference types="jest" />

import { fun } from './test-config';
fun.cleanup;

import { db } from '../src/config';
import { stripe } from '../src/income/stripe';

test('Firestore is initialized', () => {
  expect(db).toBeDefined();
});

test('Stripe is initialized', () => {
  expect(stripe).toBeDefined();
});
