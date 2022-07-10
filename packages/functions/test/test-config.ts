import * as TestFunctions from 'firebase-functions-test';

const firebaseConfig = {
  databaseURL: 'https://hvsb-dev.firebaseio.com',
  projectId: 'hvsb-dev',
  storageBucket: 'hvsb-dev.appspot.com',
};

const envConfig = {
  // stripe: { secret: env.stripeSecretTest },
  // sendgrid: { key: env.sendgrid }
};

const fun = TestFunctions(firebaseConfig, 'service-account-dev.json');

fun.mockConfig(envConfig);

export { fun };
