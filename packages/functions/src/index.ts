// Optimization from https://github.com/CodingDoug/min-functions-cold-start
// Read https://medium.com/firebase-developers/organize-cloud-functions-for-max-cold-start-performance-and-readability-with-typescript-and-9261ee8450f0

// This should be the only import in index.ts, other than what you need to build
// these functions.
import * as functions from 'firebase-functions';

export const deleteImage = functions.firestore
  .document('media/{mediaId}')
  .onDelete(async (snapshot, context) => {
    await (await import('./deleteImage')).deleteImage(snapshot, context);
  });

export const scriptureAPI = functions.https.onCall(async (data, context) => {
  return (await import('./scripture/scriptureAPI')).default(data, context);
});

export const updateDevAdminRole = functions.https.onCall(async (data, context) => {
  return (await import('./updateDevAdminRole')).default(data, context);
});

export const addTranslatedField = functions.https.onCall(async (data, context) => {
  return (await import('./addTranslatedField')).default(data, context);
});

// Email
export const onSupportEmail = functions.firestore
  .document('supportMessages/{messageId}')
  .onCreate(async (snapshot, context) => {
    await (await import('./email/onSupportEmail')).default(snapshot, context);
  });

export const onNewUser = functions.firestore
  .document('users/{userId}')
  .onCreate(async (snapshot, context) => {
    await (await import('./email/onNewUser')).default(snapshot, context);
  });

// Also update invoiceWebhookEndpoint when making changes to email sending

// Algolia Search Indexing
export const addToIndex = functions.firestore
  .document('media/{mediaId}')
  .onCreate(async (snapshot, context) => {
    await (await import('./algolia/modifyIndex')).addToIndex(snapshot, context);
  });

export const updateIndex = functions.firestore
  .document('media/{mediaId}')
  .onUpdate(async (change, context) => {
    await (await import('./algolia/modifyIndex')).updateIndex(change, context);
  });

export const deleteFromIndex = functions.firestore
  .document('media/{mediaId}')
  .onDelete(async (snapshot, context) => {
    await (await import('./algolia/modifyIndex')).deleteFromIndex(snapshot, context);
  });

// Stripe
export const stripeCreateCustomer = functions.https.onCall(async (data, context) => {
  return (await import('./income/customers')).stripeCreateCustomer(data, context);
});

export const stripeCreateCheckoutSession = functions.https.onCall(async (data, context) => {
  return (await import('./income/subscriptions')).stripeCreateCheckoutSession(data, context);
});

export const stripeCreateBillingPortalSession = functions.https.onCall(async (data, context) => {
  return (await import('./income/portal')).stripeCreateBillingPortalSession(data, context);
});

export const invoiceWebhookEndpoint = functions.https.onRequest(async (request, response) => {
  await (await import('./income/webhooks')).invoiceWebhookEndpoint(request, response);
});
