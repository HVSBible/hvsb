/// <reference types="jest" />

import { fun } from '../test-config';
fun.cleanup;

import { mockUser } from './mocks';
import { createBillingPortalSession } from '../../src/income/portal';
import { createCustomer } from '../../src/income/customers';

let user: any;

beforeAll(async () => {
  user = await mockUser();
  await createCustomer(user);
});

test('createBillingPortalSession returns a Stripe Billing Portal URL', async () => {
  const sessionId = await createBillingPortalSession(user.uid, 'https://hvsb.app/account');
  console.log(sessionId);
  expect(sessionId).toContain('https://billing.stripe.com/session');
});
