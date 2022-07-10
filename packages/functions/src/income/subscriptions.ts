import * as functions from 'firebase-functions';
import { assert, assertUID, catchErrors } from '../helpers';
import { stripe } from './stripe';
import { getCustomerId } from './customers';

/**
Creates a Stripe Checkout session id for forwarding a user to Stripe Checkout from the frontend - automatically starts with a 2 week trial
*/
export const createCheckoutSession = async (
  uid: string,
  plan: string,
  success_url: string,
  cancel_url: string
): Promise<string> => {
  try {
    const customer = await getCustomerId(uid);
    console.log({ customer });

    const session = await stripe.checkout.sessions.create({
      customer,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan, // 'basic-monthly' | 'basic-yearly'
          quantity: 1,
        },
      ],
      success_url,
      cancel_url,
      subscription_data: { trial_period_days: 14 },
    });
    return session.id;
  } catch (err) {
    throw new Error(err);
  }
};

/////// DEPLOYABLE FUNCTIONS ////////

export const stripeCreateCheckoutSession = async (
  data: any,
  context: functions.https.CallableContext
) => {
  const uid = assertUID(context);
  const plan = assert(data, 'plan');
  const success_url = assert(data, 'success_url');
  const cancel_url = assert(data, 'cancel_url');
  console.log('stripeCreateCheckoutSession: ', data);
  return catchErrors(createCheckoutSession(uid, plan, success_url, cancel_url));
};
