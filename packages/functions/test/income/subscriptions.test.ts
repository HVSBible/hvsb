/// <reference types="jest" />

import { fun } from '../test-config';
fun.cleanup;

import { mockUser } from './mocks';
import { createCheckoutSession } from '../../src/income/subscriptions';
import { createCustomer } from '../../src/income/customers';

let user: any;

beforeAll(async () => {
  user = await mockUser();
  await createCustomer(user);
});

test('createCheckoutSession returns a session ID', async () => {
  const plan = 'basic-monthly'; // basic-yearly || basic-monthly
  const sessionId = await createCheckoutSession(
    user.uid,
    plan,
    'https://hvsb.app/WEB/MAT/1',
    'https://hvsb.app/'
  );
  console.log(sessionId);
  expect(sessionId).toContain('cs_test_');
});
