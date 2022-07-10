import { updateUser } from '../../src/income/customers';

export const mockUser = async () => {
  const uid = Date.now().toString();
  const user = { uid, email: `${uid}@stripetest.com`, displayName: `Test User ${uid}` };
  await updateUser(user.uid, user);
  return user;
};
