import type { IUser } from '@hvsb/types';
import { Timestamp } from 'firebase/firestore';

export function isSubscriber(user: IUser): boolean {
  return ['active', 'trialing', 'past_due', 'manual-active'].includes(subscriptionStatus(user));
}

export function subscriptionStatus(user: IUser) {
  if (!user)
    return null;

  if (user.subscriptions?.basic) {
    if (user.subscriptions.basic.status === 'active')
      return 'active';

    if (user.subscriptions.basic.status === 'trialing')
      return 'trialing';

    if (user.subscriptions.basic.status === 'past_due')
      return 'past_due';

    if (user.subscriptions.basic.manualSubscriptionEndDate) {
      const now = Timestamp.now();
      // Can't read toDate() method on timestamps cached in localStorage
      const endDate = user.subscriptions.basic.manualSubscriptionEndDate;
      if (now.seconds <= endDate.seconds)
        return 'manual-active';

      return 'manual-expired';

    }
    if (user.subscriptions.basic.status === 'canceled')
      return 'canceled';

  }

  return 'never';
}

export async function createBillingPortalSession(return_url: string) {
  try {
    const { getFunctions, httpsCallable } = await import('firebase/functions');
    const { getFirebaseApp } = await import('sveltefirets');
    const functions = getFunctions(getFirebaseApp());
    const createPortalFun = httpsCallable<Record<string, unknown>, string>(
      functions,
      'stripeCreateBillingPortalSession'
    );
    const response = await createPortalFun({ return_url });
    location.href = response.data;
  } catch (err) {
    throw new Error('Trouble retrieving billing portal session: ' + err);
  }
}
