import * as functions from 'firebase-functions';
import { assert, assertUID, catchErrors } from '../helpers';
import { db } from '../config';
import { stripe } from './stripe';

/**
Read the user document from Firestore
*/
export const getUser = async (uid: string) => {
  return await db
    .collection('users')
    .doc(uid)
    .get()
    .then((doc) => doc.data());
};

/**
Gets a customer from Stripe
*/
export const getCustomerId = async (uid: string): Promise<string> => {
  console.log('Going to get user to pull out stripeCustomerId');
  const user = await getUser(uid);
  console.log('Got user: ', user);
  return assert(user, 'stripeCustomerId');
};

/**
Updates the user document non-destructively
*/
export const updateUser = async (uid: string, data: Record<string, unknown>) => {
  console.log(uid, data);
  return await db.collection('users').doc(uid).set(data, { merge: true });
};

/**
Takes a Firebase user and creates a Stripe customer account
*/
export const createCustomer = async (user: any) => {
  const customer = await stripe.customers.create({
    name: user.displayName,
    email: user.email,
    metadata: { firebaseUID: user.uid },
  });

  await updateUser(user.uid, { stripeCustomerId: customer.id });

  return customer;
};

/**
Read the stripe customer ID from firestore, or create a new one if missing
*/
export const getOrCreateCustomer = async (uid: string) => {
  const user = await getUser(uid);
  console.log('getOrCreateCustomer found user: ', user);
  const customerId = user && user.stripeCustomerId;

  // If missing customerID, create it
  if (!customerId) {
    console.log('no customerId found - going to create');
    return createCustomer(user);
  } else {
    console.log('Using customerId to retrieve customer from Stripe');
    return stripe.customers.retrieve(customerId);
  }
};

/////// DEPLOYABLE FUNCTIONS ////////

export const stripeCreateCustomer = async (data: any, context: functions.https.CallableContext) => {
  const uid = assertUID(context);
  console.log('running getOrCreateCustomer() with: ', uid);
  return catchErrors(getOrCreateCustomer(uid));
};
