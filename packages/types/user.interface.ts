import type { Timestamp } from 'firebase/firestore';
import type { Languages } from '.';
import type { IBaseUser } from 'sveltefirets';

export interface IUser extends IBaseUser {
  roles?: IRoles;
  currentVersion?: string;
  stripeCustomerId?: string;
  subscriptions?: {
    basic: ISubscription;
  };
  unsubscribe?: Timestamp;

  // Allow admins to view site as a normal user
  demoted?: boolean;
  // mockSubscriber?: boolean;
}

type Status =
  | 'active'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'past_due'
  | 'trialing'
  | 'unpaid';

export interface ISubscription {
  // https://stripe.com/docs/api/subscriptions/update
  period?: 'monthly' | 'yearly'; // basic-monthly or basic-yearly planIds currently in Stripe
  id?: string;
  status?: Status; // From Stripe.Subscription.Status https://stripe.com/docs/api/subscriptions/object
  start_date?: number; // timestamp
  trial_end?: number; // timestamp
  current_period_end?: number; // timestamp
  cancel_at_period_end?: boolean;

  manualSubscriptionStartDate?: Timestamp;
  manualSubscriptionEndDate?: Timestamp;
}

export interface IRoles {
  admin?: number; // 1 controls subscriptions & content; 2 controls user roles also (both can turn off admin role to view as plain reader until page refresh)
  contributor?: boolean; // can add content and edit their own
  translator?: Languages;
  // reader?: boolean; // every user starts with this  // pointless?
  // editor?: boolean; // can edit and delete any content
}
