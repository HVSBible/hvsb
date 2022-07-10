import * as functions from 'firebase-functions';

function getRecipients() {
  // Set by running `firebase functions:config:set project.key="hvsb-prod"`
  // read with `firebase functions:config:get`
  const projectId = functions.config().project.key;
  if (projectId === 'hvsb-prod') {
    return ['jacob@hvsb.app', 'hershelhouse@me.com', 'irina.cpi@icloud.com'];
  } else {
    //hvsb-dev
    return ['jacob@hvsb.app'];
  }
}

export const adminRecipients = getRecipients();
