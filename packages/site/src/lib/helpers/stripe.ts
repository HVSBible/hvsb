import { dev } from '$app/env';
import { getFirebaseApp } from 'sveltefirets';
import { getFunctions, httpsCallable } from 'firebase/functions';

let getCustomerAttempts = 0;

export async function createCustomer() {
  if (dev) {
    console.log('firing createCustomer');
  }
  try {
    const functions = getFunctions(getFirebaseApp());
    const customerFun = httpsCallable<any, { id: string }>(functions, 'stripeCreateCustomer');
    const customer = await customerFun({});
    if (dev) {
      console.log(customer.data.id);
    }
    return;
  } catch (err) {
    if (dev) {
      console.log(err);
    }
    if (getCustomerAttempts < 10) {
      getCustomerAttempts++;
      createCustomer();
    }
  }
}
