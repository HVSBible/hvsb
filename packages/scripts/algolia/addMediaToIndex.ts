import algoliasearch from 'algoliasearch';
import admin from 'firebase-admin';
const dev = process.argv[2] === 'dev';
const environment = dev ? 'dev' : 'prod';
import serviceAccountDev from '../../service-account-dev.json';
import serviceAccountProd from '../../service-account-prod.json';

const serviceAccount = dev ? serviceAccountDev : serviceAccountProd;

// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const serviceAccount = require(`../../functions/service-account-${environment}.json`);

admin.initializeApp({
  //@ts-ignore - for some reason, the object is correct but not typed properly
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://hvsb-${environment}.firebaseio.com`,
  // storageBucket: `hvsb-${environment}.appspot.com`,
});

const db = admin.firestore();

const APP_ID = 'ZZG6DI40DK';
// TODO: get keys
// @ts-ignore
import algoliaKeys from './algolia-admin-key.json';
const ADMIN_KEY = algoliaKeys.adminKey;
const projectId = `hvsb-${environment}`;

const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex(projectId === 'hvsb-prod' ? 'media_prod' : 'media_dev');

///LOGGER///
import fs from 'fs';
const logFile = fs.createWriteStream(`algolia/logs/${environment}/${Date.now()}.txt`, {
  flags: 'w',
}); // 'a' to append, 'w' to write over file contents
console.log = function (data: any) {
  logFile.write(JSON.stringify(data) + '\n');
  process.stdout.write(JSON.stringify(data) + '\n');
};
///END-LOGGER///

import { prepareDataForIndex } from '../../src/algolia/prepareDataForIndex';
async function indexMedia() {
  // For testing
  // const item = await db.doc('media/6nMgBzEYQ884l3IH3Nb0').get();
  //   const data = prepareDataForIndex(item.data() as any);
  //   const file = fs.writeFile(
  //     `algolia/logs/${environment}/size/6nMgBzEYQ884l3IH3Nb0.json`,
  //     JSON.stringify(data),
  //     (err) => {
  //       if (err) {
  //         return console.log(err);
  //       }
  //     }
  //   );

  const mediaSnapshot = await db.collection(`media`).get();
  const mediaPromises = mediaSnapshot.docs.map(async (doc) => {
    console.log(doc.id);
    const data = await prepareDataForIndex(doc.data() as any);
    return { objectID: doc.id, ...data };
  });

  const media = await Promise.all(mediaPromises);

  console.log(media.length);

  media.forEach((data) => {
    const file = fs.createWriteStream(`logs/${environment}/size/${data.objectID}.json`, {
      flags: 'w',
    });
    file.write(JSON.stringify(data));
  });

  // https://www.algolia.com/doc/api-reference/api-methods/add-objects/#examples
  // if forced to iterate instead of save all at once, take note of the rate limiting at 5000 backlogged requests https://www.algolia.com/doc/faq/indexing/is-there-a-rate-limit/
  index
    .saveObjects(media)
    .then(({ objectIDs }) => {
      console.log('Media indexed: ', objectIDs.length);
    })
    .catch((err) => {
      console.log(err);
    });
}

indexMedia();
