import * as functions from 'firebase-functions';
import { assert, assertUID, catchErrors } from '../helpers';
import { stripe } from './stripe';
import { getCustomerId } from './customers';

/**
Creates a Stripe Billing Portal Session to enable users to modify and view billing preferences in the Stripe Billing Portal
*/
export const createBillingPortalSession = async (
  uid: string,
  return_url: string
): Promise<string> => {
  try {
    const customer = await getCustomerId(uid);
    console.log({ customer });

    const session = await stripe.billingPortal.sessions.create({
      customer,
      return_url,
    });
    return session.url;
  } catch (err) {
    throw new Error(err);
  }
};

/////// DEPLOYABLE FUNCTIONS ////////

export const stripeCreateBillingPortalSession = async (
  data: any,
  context: functions.https.CallableContext
) => {
  const uid = assertUID(context);
  const return_url = assert(data, 'return_url');
  console.log('stripeCreateBillingPortalSession: ', data);
  return catchErrors(createBillingPortalSession(uid, return_url));
};
