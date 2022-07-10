import * as functions from 'firebase-functions';

import Stripe from 'stripe';
// Set by running `firebase functions:config:set stripe.secret="your_signing_secret"`
export const stripeSecret = functions.config().stripe.secret;

export const stripe = new Stripe(stripeSecret, {
  apiVersion: '2020-08-27',
});
