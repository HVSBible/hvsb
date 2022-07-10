import type { IUser } from '@hvsb/types';
import { createUserStore } from 'sveltefirets';
import { createCustomer } from '$lib/helpers/stripe';
import { firebaseConfig } from '$lib/firebaseConfig';

export const user = createUserStore<IUser>({
  userKey: `${firebaseConfig.projectId}_firebase_user`,
  log: true,
});

user.subscribe((user) => {
  if (user && !user.stripeCustomerId) {
    setTimeout(() => createCustomer(), 3000); // give time for new user's info to be saved to database before running cloud function
  }
});
