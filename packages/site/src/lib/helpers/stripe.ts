import { dev } from '$app/environment';
import { getFirebaseApp } from 'sveltefirets';
import { getFunctions, httpsCallable } from 'firebase/functions';

let getCustomerAttempts = 0;

export async function createCustomer() {
  if (dev)
    console.info('firing createCustomer');

  try {
    const functions = getFunctions(getFirebaseApp());
    const customerFun = httpsCallable<any, { id: string }>(functions, 'stripeCreateCustomer');
    const customer = await customerFun({});
    if (dev)
      console.info(customer.data.id);


  } catch (err) {
    if (dev)
      console.info(err);

    if (getCustomerAttempts < 10) {
      getCustomerAttempts++;
      createCustomer();
    }
  }
}
