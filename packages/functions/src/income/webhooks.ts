import { db } from '../config';
import { stripe } from './stripe';
import Stripe from 'stripe';
import * as functions from 'firebase-functions';
import {
  notifyOfNewSubscriber,
  notifyAdminsOfSubscriptionEnd,
} from '../email/notifyOfNewSubscriber';

// Set by running `firebase functions:config:set stripe.webhook_signature="your_signing_secret"`
export const stripeWebhookSignature = functions.config().stripe.webhook_signature;

const setSubscriptionStatus = async (subscription: Stripe.Subscription, uid: string) => {
  console.log({ subscription });
  const subType = subscription.items.data[0].price.id.split('-')[0];
  console.log({ subType });

  try {
    const subscriptions = {
      [subType]: {
        period: subscription.items.data[0].price.nickname,
        id: subscription.id,
        status: subscription.status,
        start_date: subscription.start_date,
        trial_end: subscription.trial_end,
        current_period_end: subscription.current_period_end,
        cancel_at_period_end: subscription.cancel_at_period_end,
      },
    };
    console.log({ subscriptions });

    return await db.doc(`users/${uid}`).set({ subscriptions }, { merge: true });
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Business logic for specific webhook event types
 */
const webhookHandlers = {
  'checkout.session.completed': async (data: Stripe.Checkout.Session) => {
    const subscription = (await stripe.subscriptions.retrieve(
      data.subscription as string
    )) as Stripe.Subscription;
    const customer = (await stripe.customers.retrieve(data.customer as string)) as Stripe.Customer;
    return await setSubscriptionStatus(subscription, customer.metadata.firebaseUID);
  },
  'customer.subscription.created': async (data: Stripe.Subscription) => {
    const customer = (await stripe.customers.retrieve(data.customer as string)) as Stripe.Customer;
    await setSubscriptionStatus(data, customer.metadata.firebaseUID);
    return await notifyOfNewSubscriber(
      customer.metadata.firebaseUID,
      data.items.data[0].price.nickname
    );
  },
  'customer.subscription.updated': async (data: Stripe.Subscription) => {
    const customer = (await stripe.customers.retrieve(data.customer as string)) as Stripe.Customer;
    if (data.cancel_at_period_end) {
      await notifyAdminsOfSubscriptionEnd(
        customer.metadata.firebaseUID,
        data.items.data[0].price.nickname,
        true
      );
    }
    return await setSubscriptionStatus(data, customer.metadata.firebaseUID);
  },
  'customer.subscription.deleted': async (data: Stripe.Subscription) => {
    const customer = (await stripe.customers.retrieve(data.customer as string)) as Stripe.Customer;
    await setSubscriptionStatus(data, customer.metadata.firebaseUID);
    return await notifyAdminsOfSubscriptionEnd(
      customer.metadata.firebaseUID,
      data.items.data[0].price.nickname
    );
  },
  'invoice.paid': async (data: Stripe.Invoice) => {
    const subscription = (await stripe.subscriptions.retrieve(
      data.subscription as string
    )) as Stripe.Subscription;
    const customer = (await stripe.customers.retrieve(data.customer as string)) as Stripe.Customer;
    return await setSubscriptionStatus(subscription, customer.metadata.firebaseUID);
  },
  'invoice.payment_failed': async (data: Stripe.Invoice) => {
    const subscription = (await stripe.subscriptions.retrieve(
      data.subscription as string
    )) as Stripe.Subscription;
    const customer = (await stripe.customers.retrieve(data.customer as string)) as Stripe.Customer;
    return await setSubscriptionStatus(subscription, customer.metadata.firebaseUID);
  },
};

/////// DEPLOYABLE FUNCTIONS ////////

export const invoiceWebhookEndpoint = async (
  req: functions.https.Request,
  res: functions.Response
): Promise<void> => {
  try {
    const signature = req.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent(req.rawBody, signature, stripeWebhookSignature);

    //@ts-ignore
    await webhookHandlers[event.type](event.data.object);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};
