/// <reference types="jest" />

import { fun } from '../test-config';
fun.cleanup;

import { getOrCreateCustomer, getUser, createCustomer } from '../../src/income/customers';
import { mockUser } from './mocks';

let user: any;

beforeAll(async () => {
  return;
  user = await mockUser();
  // await createCustomer(user) // run last test with and without this to test both cases
});

test.skip('createCustomer creates a Stripe Customer', async () => {
  const customer = await createCustomer(user);

  expect(customer.id).toContain('cus_');
  expect(customer.metadata.firebaseUID).toEqual(user.uid);

  const userDoc = await getUser(user.uid);

  expect(userDoc.stripeCustomerId).toContain('cus_');
});

test.skip('getOrCreateCustomer creates/retrieves a Stripe Customer', async () => {
  const customer = await getOrCreateCustomer(user.uid);
  expect(customer.id).toContain('cus_');
  //@ts-ignore
  expect(customer.metadata.firebaseUID).toEqual(user.uid);

  const userDoc = await getUser(user.uid);

  expect(userDoc.stripeCustomerId).toContain('cus_');
});
