import * as functions from 'firebase-functions';
import { ISupportMessage } from '../../../src/lib/interfaces';
import { sesClient } from './sesClient';
import { SendEmailCommand, SendEmailCommandInput } from '@aws-sdk/client-ses';

export default async (
  snapshot: functions.firestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const data = snapshot.data() as ISupportMessage;
  const params: SendEmailCommandInput = {
    Source: 'jacob@hvsb.app',
    Destination: {
      ToAddresses: ['jacob@hvsb.app'],
    },
    ReplyToAddresses: [data.email],
    Message: {
      Subject: {
        Charset: 'UTF-8',
        Data: 'House Visual Study Bible Support Request',
      },
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `${data.message} 
    
Sent by ${data.name} (${data.email}) from ${data.url}`,
        },
      },
    },
  };

  try {
    const data = await sesClient.send(new SendEmailCommand(params));
    console.log('Success', data);
    return { success: true };
  } catch (err) {
    console.log('Error', err);
    return { success: false };
  }
};
