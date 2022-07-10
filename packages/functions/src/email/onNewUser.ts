import * as functions from 'firebase-functions';
import { adminRecipients } from './adminRecipients';
import { sesClient } from './sesClient';
import { SendEmailCommand, SendEmailCommandInput } from '@aws-sdk/client-ses';

export default async (
  snapshot: functions.firestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const user = snapshot.data();

  if (user) {
    const params: SendEmailCommandInput = {
      Source: 'wayne@hvsb.app', // SENDER_ADDRESS
      Destination: {
        ToAddresses: [user.email],
      },
      Message: {
        Subject: {
          Charset: 'UTF-8',
          Data: 'Welcome to the House Visual Study Bible!',
        },
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: 'HTML_FORMAT_BODY',
            // templateId: 'd-2be148ba365942d881d08f6bf3745435', // "Automatic Welcome"
            // dynamic_template_data: {
            //// name: user.displayName,
            // },
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
          Data: `New HVSB user: ${user.displayName}`,
        },
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: `Hey Admins,
        
${user.displayName} has just created a HVSB account, and we sent them an automatic welcome email to ${user.email}

If you know them personally, feel free to also send them a note to say hi and thank you.

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
