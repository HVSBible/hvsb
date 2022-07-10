import * as functions from 'firebase-functions';
import algoliasearch from 'algoliasearch';

// Set by running `firebase functions:config:set algolia.app="..."`
// read with `firebase functions:config:get`
const APP_ID = functions.config().algolia.app; // same for dev & prod
const ADMIN_KEY = functions.config().algolia.key; // same for dev & prod
const projectId = functions.config().project.key;

const client = algoliasearch(APP_ID, ADMIN_KEY);
const prodIndex = client.initIndex('media_prod');
// const devIndex = client.initIndex('media_dev');

import { prepareDataForIndex } from './prepareDataForIndex';
import { IDocument, IImage } from '../../../src/lib/interfaces';

export const addToIndex = async (
  snapshot: functions.firestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const objectID = snapshot.id;
  console.log(`adding ${objectID} to Algolia index`);
  const media = await prepareDataForIndex(snapshot.data() as IDocument | IImage);
  if (projectId === 'hvsb-prod') {
    await prodIndex.saveObject({ ...media, objectID });
  }
  return true;
};

export const updateIndex = async (
  change: functions.Change<functions.firestore.DocumentSnapshot>,
  context: functions.EventContext
) => {
  const objectID = change.after.id;
  console.log(`updating ${objectID} in Algolia index`);
  const media = await prepareDataForIndex(change.after.data() as IDocument | IImage);
  if (projectId === 'hvsb-prod') {
    await prodIndex.saveObject({ ...media, objectID });
  }
  return true;
};

export const deleteFromIndex = async (
  snapshot: functions.firestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  console.log(`deleting ${snapshot.id} from Algolia index`);
  if (projectId === 'hvsb-prod') {
    await prodIndex.deleteObject(snapshot.id);
  }
  return true;
};
