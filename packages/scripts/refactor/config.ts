import { program } from 'commander';
import admin from 'firebase-admin';

program
  //   .version('0.0.1')
  .option('-e, --environment [dev/prod]', 'Firebase Project', 'dev')
  .parse(process.argv);

const environment = program.opts().environment == 'prod' ? 'prod' : 'dev';

import serviceAccountDev from '../../service-account-dev.json';
import serviceAccountProd from '../../service-account-prod.json';
const serviceAccount = environment === 'dev' ? serviceAccountDev : serviceAccountProd;

admin.initializeApp({
  //@ts-ignore - for some reason, the object is correct but not typed properly
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://hvsb-${environment}.firebaseio.com`,
});
// const db = admin.firestore();

///LOGGER///
import fs from 'fs';
const logFile = fs.createWriteStream('../log/log-add-author.txt', { flags: 'a' }); // 'a' to append, 'w' to truncate the file every time the process starts.
console.log = function (data: any) {
  logFile.write(JSON.stringify(data) + '\n');
  process.stdout.write(JSON.stringify(data) + '\n');
};
///END-LOGGER///

console.log(`Running on ${environment}`);
