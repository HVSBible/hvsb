import { db } from '../config';
import { adminRecipients } from './adminRecipients';
import { sesClient } from './sesClient';
import { SendEmailCommand, SendEmailCommandInput } from '@aws-sdk/client-ses';

/**
Welcome new subscribers and email Admins upon new subscriber
*/
export const notifyOfNewSubscriber = async (uid: string, planName: string) => {
  const userSnap = await db.doc(`users/${uid}`).get();
  const user = userSnap.data();
  if (user) {
    const params: SendEmailCommandInput = {
      Source: 'support@hvsb.app', // SENDER_ADDRESS
      Destination: {
        ToAddresses: [user.email],
      },
      Message: {
        Subject: {
          Charset: 'UTF-8',
          Data: `${
            planName === 'yearly' ? 'Yearly' : 'Monthly'
          } Subscription to the House Visual Study Bible`,
        },
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: 'HTML_FORMAT_BODY',
            //   templateId: 'd-c68909940da34b7ca1c7711589d3eb4c', // "Subscription Started"
            //   dynamic_template_data: {
            //     plan: planName,
            //   },
          },
        },
      },
    };

    try {
      const data = await sesClient.send(new SendEmailCommand(params));
      console.log('Success', data);
    } catch (err) {
      console.log('Error', err);
    }

    const adminParams: SendEmailCommandInput = {
      Source: 'jacob@hvsb.app', // SENDER_ADDRESS
      Destination: {
        ToAddresses: adminRecipients,
      },
      Message: {
        Subject: {
          Charset: 'UTF-8',
          Data: `New HVSB Subscriber on the ${planName} plan`,
        },
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: `Hey Admins,

${user.displayName} just subscribed to the ${planName} plan. We automatically sent ${user.displayName} an email noting the beginning of their subscription and giving them convenient links to their account page on HVSB, but if you know them you can also drop them a line at ${user.email} if you desire.

Thanks,
Jacob via a Firebase Cloud Function

https://hvsb.app`,
          },
        },
      },
    };
    try {
      const data = await sesClient.send(new SendEmailCommand(adminParams));
      console.log('Success', data);
    } catch (err) {
      console.log('Error', err);
    }
  }
  return true;
};

/**
Email Admins upon ended subscription
*/
export const notifyAdminsOfSubscriptionEnd = async (
  uid: string,
  planName: string,
  canceled = false
) => {
  const userSnap = await db.doc(`users/${uid}`).get();
  const user = userSnap.data();
  if (user) {
    const adminParams: SendEmailCommandInput = {
      Source: 'jacob@hvsb.app', // SENDER_ADDRESS
      Destination: {
        ToAddresses: adminRecipients,
      },
      Message: {
        Subject: {
          Charset: 'UTF-8',
          Data: `HVSB Subscriber ended subscription`,
        },
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: `Hey Admins,

${user.displayName} just ${
              canceled ? 'canceled' : 'ended'
            } their ${planName} subscription. Their email is ${user.email}.

https://hvsb.app`,
          },
        },
      },
    };
    try {
      const data = await sesClient.send(new SendEmailCommand(adminParams));
      console.log('Success', data);
    } catch (err) {
      console.log('Error', err);
    }
  }
  return true;
};
